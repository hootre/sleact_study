import Chat from '@components/Chat';
import { IDM } from '@typings/db';
import React, { useCallback, useRef, VFC } from 'react';
import { ChatZone } from './styles';
import { Scrollbars } from 'react-custom-scrollbars';
interface Props {
  chatData?: IDM[];
}
const ChatList: VFC<Props> = ({ chatData }) => {
  const scrollbarRef = useRef(null);
  const onscroll = useCallback(() => {}, []);
  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onscroll}>
        {chatData?.map((chat) => {
          return <Chat key={chat.id} data={chat} />;
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
