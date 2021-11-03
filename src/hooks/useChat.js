import { useEffect, useRef, useState } from 'react';
import { Manager } from 'socket.io-client';
// hooks

const SERVER_URL = 'http://localhost:5002';

export const useChat = (idChat, token) => {
  const [messages, setMessages] = useState([]);
  const [maxMessage, setMaxMessage] = useState(false);
  const socketChatRef = useRef(null);

  const getDontReadMessages = (messages, idUser) => {
    setMaxMessage(messages.length !== 10);
    const idMessages = [];
    messages.forEach((message, index) => {
      if ((Array.isArray(message.read) && message.read.indexOf(idUser) === -1)
          || !Array.isArray(message.read)) {
        idMessages.push(message._id);
      }
    });

    return idMessages;
  };

  useEffect(() => {
    const manager = new Manager(SERVER_URL, {
      query: { idChat },
    });
    socketChatRef.current = manager.socket('/chat', {
      auth: {
        token: `Bearer ${token}`,
      },
    });
    // От слежка подключения
    socketChatRef.current.on('connect', () => {
    });
    // От слежка получение первых сообщений
    socketChatRef.current.on('messages:first', ({ messages, idUser }) => {
      const idMessages = getDontReadMessages(messages, idUser);
      socketChatRef.current.emit('message:read', { idMessages });
      setMessages([...messages]);
    });

    // От слежка старых сообщений
    socketChatRef.current.on('messages:old', ({ messages, idUser }) => {
      const idMessages = getDontReadMessages(messages, idUser);
      socketChatRef.current.emit('message:read', { idMessages });
      setMessages((aldMessage) => [...messages, ...aldMessage]);
    });
    // Отслеживание новых сообщений
    socketChatRef.current.on('message:new', (message) => {
      socketChatRef.current.emit('message:read', { idMessages: [message._id] });
      setMessages((messages) => [...messages, message]);
    });

    // От слежка ошибки от сервера
    socketChatRef.current.on('error', (messageError) => {
      alert(messageError);
    });

    // От слежка отключение от сервера
    socketChatRef.current.on('disconnect', () => {
    });

    return () => {
      socketChatRef.current.disconnect();
    };
  }, [idChat]);

  // Отправка сообщения
  const sendMessage = ({ message }) => {
    console.log('send');
    socketChatRef.current.emit('message:new', {
      message,
    });
  };

  // Отправка запроса на получения старых сообщений
  const loadOldMessage = () => {
    console.log('first id', messages[0]._id);
    if (!maxMessage) {
      socketChatRef.current.emit('message:old', { idMessage: messages[0]._id, size: 10 });
    } else {
      alert('Все старые сообщения уже загружены');
    }
  };
  return {
    messages, sendMessage, loadOldMessage,
  };
};
