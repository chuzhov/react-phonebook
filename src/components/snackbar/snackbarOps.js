export const SET_SNACKBAR = 'snackbar/settings/SET_SNACKBAR';

export const setSnackbar = (
  snackbarOpen,
  snackbarType = 'success',
  snackbarMessage = ''
) => ({
  type: SET_SNACKBAR,
  payload: {
    snackbarOpen,
    snackbarType,
    snackbarMessage,
  },
});
