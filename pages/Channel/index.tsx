import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import { IChannel, IChat, IDM } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Container, Header } from './styles';

const Channel = () => {
  const { workspace, channel, id } = useParams<{ workspace: string; channel: string; id: string }>();
  const { data: channelsData } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate } = useSWR<IChat[]>(
    `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=1`,
    fetcher,
  );

  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
          content: chat,
        })
        .then(() => {
          revalidate();
          setChat('');
        })
        .catch(console.error);
    },
    [chat],
  );

  if (!channelsData || !myData) {
    return null;
  }
  return (
    <Container>
      <Header>채널!</Header>
      {chatData?.map((item) => {
        console.log(item.content);
      })}
      <ChatList />
      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} placeholder="채팅을 입력하세요" />
    </Container>
  );
};

export default Channel;
