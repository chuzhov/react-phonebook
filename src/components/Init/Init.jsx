import { fetchContactsOp } from 'components/redux/operations/phonebookOps';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Init = () => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.contacts?.isLoading);

  useEffect(() => {
    dispatch(fetchContactsOp());
  }, [dispatch]);

  return <></>;
};

export default Init;
