import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useChat } from '../../../hooks/useChat';
import { tokenUser } from '../../../hooks/api';

const Chat = ({ ...props }) => {
  const { idChat } = useParams();
  const [value, setValue] = useState('');

  const { messages, sendMessage, loadOldMessage } = useChat(idChat, tokenUser);
  const [page, setPage] = useState(2);

  const onClick = () => {
    sendMessage({ message: value });
    setValue('');
    setPage(2);
  };

  const LoadPage = () => {
    loadOldMessage();
  };
  return (
    <>
      <Link to="/">Назад</Link>
      <button onClick={LoadPage}>Загрузить до</button>
      {messages.map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>
          { `отправитель: ${value.sender?.firstName} ${value.sender?.lastName} ` }
          {`сообщение: ${value.text}`}
        </p>
      ))}
      <p>Сообщение</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
      <button onClick={onClick}>On Connect</button>
    </>
  );
};

export default Chat;
