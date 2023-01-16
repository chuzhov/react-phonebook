import { logoutUserOp } from 'components/redux/auth/authOps';
import { useDispatch, useSelector } from 'react-redux';
import './UserMenu.css';

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { selectUserName } from 'components/redux/auth/authSelectors';
import { Logo } from 'components/Logo/Logo';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  return (
    <div className="header">
      <nav className="header-nav">
        <Logo />

        <ul className="top-menu">
          <li className="top-menu__item">
            <NavLink className="top-menu__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="top-menu__item">
            <NavLink className="top-menu__link" to="/contacts">
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>

      <Button
        onClick={() => dispatch(logoutUserOp())}
        variant="contained"
        size="small"
        endIcon={<LogoutIcon />}
        sx={{ marginLeft: 'auto' }}
      >
        Log out, {userName}
      </Button>
    </div>
  );
};

export default UserMenu;
