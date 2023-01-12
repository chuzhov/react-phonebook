import { selectUserName } from 'components/auth/authSelectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContactsPage from './ContactsPage';

const HomePage = () => {
  const userName = useSelector(selectUserName);
  return (
    <>
      <h2>Hello, {userName}</h2>
      <Link to="/contacts">Manage contacts</Link>
    </>
  );
};

export default HomePage;
