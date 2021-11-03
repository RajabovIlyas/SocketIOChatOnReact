import React from 'react';
import { Link } from 'react-router-dom';
import { useMessageNotification } from '../../hooks/useMessageNotification';
import { tokenUser } from '../../hooks/api';

const Header = ({ ...props }) => {
  const { countNotification, updateData } = useMessageNotification(tokenUser);
  const str = 'str';
  return (
    <div>
      <Link to="/">
        {`Новых сообщений ${countNotification}`}
      </Link>
      <button onClick={updateData}>Обновить данные</button>
    </div>
  );
};

export default Header;
