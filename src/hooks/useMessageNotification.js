import { useEffect, useRef, useState } from 'react';
import { Manager } from 'socket.io-client';
// hooks

const SERVER_URL = 'http://localhost:5002';

export const useMessageNotification = (token) => {
  const socketRef = useRef(null);
  const [countNotification, setCountNotification] = useState({ count: 0 });
  const [str, setStr] = useState(0);

  useEffect(() => {
    const manager = new Manager(SERVER_URL);
    socketRef.current = manager.socket('/message-notification', {
      auth: {
        token: `Bearer ${token}`,
      },
    });
    socketRef.current.on('notification:get', ({ countNotification }) => {
      setStr(str + 1);
      console.log('countNotification', countNotification);
      setCountNotification({ count: countNotification });
    });
    socketRef.current.on('notification:get-new', (countNotification) => {
      console.log(`str - ${str}`, countNotification);
      setStr(str + 1);
      setCountNotification({ count: countNotification });
    });
    socketRef.current.on('error', ({ message }) => {
      alert(message);
    });
  }, [token]);

  const updateData = () => {
    socketRef.current.emit('notification:update', {});
  };

  return {
    countNotification: countNotification.count,
    updateData,
  };
};
