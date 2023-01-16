import { selectUserName } from 'components/redux/auth/authSelectors';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const userName = useSelector(selectUserName);
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Hello, {userName}!</h2>
      <p>This is very simple contacts manager.</p>
      <p>The main things are running under the hood here.</p>
      <p>Have You ever heard about React, Redux or the REST API?</p>
      <p>
        That's it! I was focused on those things, so, I've had no time for a
        pretty design.
      </p>
    </div>
  );
};

export default HomePage;
