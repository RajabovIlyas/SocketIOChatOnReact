import { useEffect, useRef, useState } from 'react';
import { Manager } from 'socket.io-client';
// hooks

const SERVER_URL = 'http://localhost:5002';

export const useChatsUser = (token) => {
  const socketRef = useRef(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const manager = new Manager(SERVER_URL);
    socketRef.current = manager.socket('/chats-user', {
      auth: {
        token: `Bearer ${token}`,
      },
    });
    socketRef.current.on('chats:get', (chats) => {
      console.log('{ messageNotification, countNotification }', { chats });
      setChats(chats);
    });

    socketRef.current.on('disconnect', () => {
      setChats([]);
    });

    socketRef.current.on('error', ({ message }) => {
      alert(message);
    });
  }, [token]);

  const disconnect = () => {
    socketRef.current.disconnect();
  };

  return {
    chats, disconnect,
  };
};
