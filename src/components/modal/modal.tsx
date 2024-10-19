import {
  Box,
  Modal as MuiModal,
} from '@mui/material';


import './modal.scss';

interface RowPropsIF {
  open: boolean
  handleClose(): void
  children: any
}

function Modal(props: RowPropsIF) {
  const { open, children, handleClose } = props;

  const style = {
    position: 'absolute',
    marginTop: '30px',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '80vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    maxHeight: '80%',
    p: 4,
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="release-modal"
      aria-describedby="release-modal"
    >
      <Box sx={style}>
        {children}
      </Box>
    </MuiModal>
  )
}

export default Modal;
