import React from 'react';
import { Link } from 'react-router-dom';
import { tokenUser } from '../../../hooks/api';
import { useChatsUser } from '../../../hooks/useChatsUser';

const MenuChats = ({ ...props }) => {
  const menu = 'menu';
  const { chats, disconnect } = useChatsUser(tokenUser);
  console.log('chats', chats);

  return (
    <div>
      {chats.map(({
        _id, participants, message, dontReadMessageCount, title, ...value
      }, index) => (
        <Link to={_id} onClick={disconnect} key={index}>
          <div style={{ border: '2px solid red' }}>
            <div>
              {title
                ? <p>{title}</p>
                : (
                  <p>
                    В чате участвуют:
                    {participants.map((value) => `${value.firstName} ${value.lastName}, `)}
                  </p>
                )}
            </div>
            <div>
              <p>
                {message ? `${message.sender.firstName} ${message.sender.lastName}: ${message.text}`
                  : 'Чат только был создан'}
              </p>
            </div>
            <div>
              <p>
                {`Количество новых сообщений: ${dontReadMessageCount}`}
              </p>
            </div>
            <div>
              <p>
                {`Дата отправки: ${new Date(message.departureDate)}`}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuChats;
