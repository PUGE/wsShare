import React from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '../reducers';
import TransferList from './TransferList';
import Network from './Network';

const TransfersSection: React.FC = () => {
  const clientColor = useSelector((store: StateType) => store.clientColor);
  const noticeText = useSelector((store: StateType) => store.noticeText);
  const noticeUrl = useSelector((store: StateType) => store.noticeUrl);

  return (
    <div>
      <h2>文件共享</h2>
      {!!noticeText && (
        <div className="subsection notice">
          {noticeUrl ? <a href={noticeUrl}>{noticeText}</a> : noticeText}
        </div>
      )}
      <div className="subsection info-grid">
        <div className="image">
          <div
            className="network-tile"
            style={{
              backgroundColor: clientColor,
            }}
          >
            我
          </div>
        </div>
        <div className="info">
          <div>
            <strong>操作提示</strong>
          </div>
          <div>
            通过点击下方上传按钮或者将你想要发送的文件拖拽到下方区域即可将文件发送给你的好友。
          </div>
        </div>
      </div>
      <Network />
      <TransferList />
    </div>
  );
};

export default TransfersSection;
