import React, { useState, useCallback } from 'react';
import QrCode from 'qrcode.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {FaCopy } from 'react-icons/fa';

import { showCliToolInfo } from '../config';
import Chat from './Chat';

interface QrCodeSectionProps {
  href: string;
}

const shareSupported = !!(navigator as any).share;

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ href }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => setCopied(true), [setCopied]);

  return (
    <div>
      <h2>分享链接</h2>
      <div className="qrcode subsection">
        <div className="info">
          {showCliToolInfo ? (
            <>
              To connect to your network and start copying files, scan the QR
              code below, open the URL on another device, or use the dedicated{' '}
              <a
                href="https://github.com/mat-sz/droplol"
                target="_blank"
                rel="noopener noreferrer"
              >
                CLI tool
              </a>{' '}
              (available on npm).
            </>
          ) : (
            <>
              将以下地址或二维码分享给朋友，加入后即可发送消息或文件！
            </>
          )}
        </div>
        <div>
          <QrCode value={href} />
        </div>
        <div>
          <pre>{href}</pre>
          <div className="buttons">
            <CopyToClipboard text={href} onCopy={onCopy}>
              <button>
                <FaCopy /> {copied ? '已复制' : '复制'}
              </button>
            </CopyToClipboard>
            {shareSupported}
          </div>
        </div>
      </div>
      <h2>聊天</h2>
      <Chat />
    </div>
  );
};

export default QrCodeSection;
