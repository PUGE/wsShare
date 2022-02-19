import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { StateType } from '../reducers';
import NetworkTile from './NetworkTile';
import { animationPropsOpacity } from '../animationSettings';

interface NetworkProps {
  onSelect?: (clientId: string) => void;
}

const Network: React.FC<NetworkProps> = ({ onSelect }) => {
  const network = useSelector((store: StateType) => store.network);

  return (
    <div className={'subsection ' + (network.length > 0 ? 'network' : '')}>
      <AnimatePresence>
        {network.length > 0 ? (
          <AnimatePresence>
            {network.map(client => (
              <NetworkTile
                key={client.clientId}
                client={client}
                onSelect={onSelect}
              />
            ))}
          </AnimatePresence>
        ) : (
          <motion.span {...animationPropsOpacity}>
            <div>还没有人加入到你的分享链接.</div>
            <div>将网页链接发送给你的好友让他们加入吧.</div>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Network;
