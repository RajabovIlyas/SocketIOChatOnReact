import React, { useEffect, useRef, useState } from 'react';
// получаем класс IO
import io from 'socket.io-client';
import { useChat } from './hooks/useChat';
import {tokenUser} from "./App";

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = 'http://localhost:5002';
const idChat = '616186627bbec23258c37e5b';

const idUser = '60ed6087aa21f73b74348eef';

const WSocket = () => {
  const [value, setValue] = useState('');

  const { messages, sendMessage, loadOldMessage } = useChat(idChat, tokenUser, idUser);
  const [page, setPage] = useState(2);

  const onClick = () => {
    sendMessage({ messageText: value });
    setValue('');
    setPage(2);
  };

  const LoadPage = () => {
    loadOldMessage(page);
    setPage(page + 1);
  };

  return (
    <>
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

export default WSocket;
