import { useState } from "react";
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function Alert({ text, onClose }: any) {
  const [open, setOpen] = useState(true);

  const handleClose: any = (event: any, reason: any): any => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    onClose();
  };

  const action = (
    <>
      <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
    <Snackbar
        open={open}
        // sx={{ display: 'block' }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={text}
        action={action}
    />
    {/* <MuiAlert onClose={() => {}} severity="error">This is an error alert — check it out!</MuiAlert> */}
    </div>
  )
}
