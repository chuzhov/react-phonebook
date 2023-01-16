import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { setSnackbar } from './snackbarOps';
import { selectSnackbarOpen } from './snackbarSelectors';
import { selectSnackbarType } from './snackbarSelectors';
import { selectSnackbarMessage } from './snackbarSelectors';

const CustomizedSnackbars = () => {
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(selectSnackbarOpen);
  const snackbarType = useSelector(selectSnackbarType);
  const snackbarMessage = useSelector(selectSnackbarMessage);
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
