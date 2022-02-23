import dotenv from 'dotenv-flow';
dotenv.config();

import WebSocket from 'ws';


import { WSClient } from './WSClient';
import { ClientManager, maxSize } from './ClientManager';
import { isMessageModel } from './types/typeChecking';

import fs from 'fs';
// Configuration
const host = process.env.WS_HOST || '0.0.0.0';
const port = parseInt(process.env.WS_PORT) || 5000;

const wss = new WebSocket.Server({ host: host, port: port });

const clientManager = new ClientManager();
wss.on('connection', (ws, req) => {
  const client = new WSClient(ws, req);
  clientManager.addClient(client);

  ws.on('error', error => {
    console.log('[ERROR (Handled)]', error.message);
  });

  ws.on('message', (data: string) => {
    // Prevents DDoS and abuse.
    if (!data || data.length > maxSize) return;

    try {
      const message = JSON.parse(data);

      if (isMessageModel(message)) {
        clientManager.handleMessage(client, message);
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    clientManager.removeClient(client);
  });
  fileListUpdata()
});

setInterval(() => {
  clientManager.removeBrokenClients();
}, 1000);

// Ping clients to keep the connection alive (when behind nginx)
setInterval(() => {
  clientManager.pingClients();
}, 5000);

setInterval(() => {
  clientManager.removeInactiveClients();
}, 10000);

console.log('程序正在运行中!');

import express from 'express'
import fileUpload from 'express-fileupload'
const contentDisposition = require('content-disposition')
const app = express();
app.use( fileUpload() );
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers","*")
  next();
});

function fileListUpdata () {
  let temp:string[] = []
  const fileList:string[] = fs.readdirSync("./uploads/")
  fileList.forEach(element => {
    temp.push(element.replace('.bk', ''))
  });
  const clientList = clientManager.getClientsList()
  for (let index = 0; index < clientList.length; index++) {
    const client = clientList[index];
    client.send(
      JSON.stringify({
        type: 'fileListUpdata',
        list: temp
      })
    );
  }
}

// 处理由 /upload 页面发送过来的post请求
app.post('/upload', (req, res) => {
  // req 中的 files 属性由 express-fileupload 中间件添加!? (疑问暂存)
  // 判断 files 属性是否存在 和 是否有文件传来 若无返回400
  if(!req || req.files === null || !req.files.file){
    return res.status(400).json({msg:'no file uploaded'});
  }
  // 否则 获取文件
  // file 由后文中 formData.append('file', file) 的第一个参数定义 可自定义为其他名称
  let file = req.files.file[0] ? req.files.file[0] : req.files.file
  const base64Data = file.data.toString('base64')
  // 还原 new Buffer(base64Data, 'base64')
  console.log(`上传文件: ${file.name}`)
  // 移动文件到第一参数指定位置 若有错误 返回500
  fs.writeFile('./uploads/' + file.name + '.bk', base64Data, function(err) { 
    if(err){
	    console.log(err);
    }
    setTimeout(() => {
      fileListUpdata()
    }, 0);
    res.end(JSON.stringify({err: 0}))
  })
});

app.get('/download/:fileName',function(req, res) {
  const params = req.params
  if (params.fileName) {
    var buff = fs.readFileSync(`./uploads/${params.fileName}.bk`, {encoding:'utf8', flag:'r'});
    // 解密
    res.set('Content-Disposition', contentDisposition(params.fileName))
    res.end(new Buffer(buff.toString(), 'base64'))
  }
})

app.listen(5001,() => {console.log('Server started...')});