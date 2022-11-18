import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SnackbarComponent = ({
  snackbarActive,
  setSnackbarActive,
  errorMessage,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarActive(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={snackbarActive}
      autoHideDuration={6000}
      onClose={handleClose}
      message={errorMessage}
      action={action}
    />
  );
};

export default SnackbarComponent;
