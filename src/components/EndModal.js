import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { AppContext } from '../AppContext';

const EndModal = () => {
  const { openLoser, setOpenLoser } = useContext(AppContext);

  // const classes = useStyles();
  
  const handleClose = () => setOpenLoser(false);

  return (
    <Modal
        open={openLoser}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You Lost!
          </Typography>
          <Button variant='contained' color='success'>
            Play Again!
          </Button>
        </Box>
      </Modal>
  )
}

export default EndModal;