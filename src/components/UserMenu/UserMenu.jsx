import { logoutUserOp } from 'components/auth/authOps';
import { useDispatch } from 'react-redux';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className={css['header']}>
      <nav className={css['header-nav']}>
        <h2>Phonebook App</h2>
      </nav>
      <button type="button" onClick={() => dispatch(logoutUserOp())}>
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
