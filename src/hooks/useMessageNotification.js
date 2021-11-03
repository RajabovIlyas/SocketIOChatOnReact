import { useEffect, useRef, useState } from 'react';
import { Manager } from 'socket.io-client';
// hooks

const SERVER_URL = 'http://localhost:5002';

export const useMessageNotification = (token) => {
  const socketRef = useRef(null);
  const [countNotification, setCountNotification] = useState({ count: 0 });

  useEffect(() => {
    const manager = new Manager(SERVER_URL);
    socketRef.current = manager.socket('/message-notification', {
      auth: {
        token: `Bearer ${token}`,
      },
    });
    socketRef.current.on('notification:get', ({ countNotification }) => {
      setCountNotification({ count: countNotification });
    });
    socketRef.current.on('error', ({ message }) => {
      alert(message);
    });
  }, [token]);

  return {
    countNotification: countNotification.count,
  };
};
