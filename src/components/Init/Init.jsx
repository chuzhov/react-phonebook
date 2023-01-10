import { fetchContactsOp } from 'components/redux/operations/phonebookOps';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Init = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsOp());
  }, [dispatch]);

  return <></>;
};

export default Init;
