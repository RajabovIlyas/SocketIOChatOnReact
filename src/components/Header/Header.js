import React from 'react';
import { Link } from 'react-router-dom';
import { useMessageNotification } from '../../hooks/useMessageNotification';
import { tokenUser } from '../../hooks/api';

const Header = ({ ...props }) => {
  const { countNotification } = useMessageNotification(tokenUser);
  const str = 'str';
  return (
    <div>
      <Link to="/">
        {`Новых сообщений ${countNotification}`}
      </Link>
    </div>
  );
};

export default Header;
