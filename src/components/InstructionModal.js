import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { AppContext } from '../AppContext';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

const InstructionModal = () => {
  const { openInstructions, setOpenInstructions } = useContext(AppContext);

  // const classes = useStyles();
  
  const handleClose = () => setOpenInstructions(false);

  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={openInstructions}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
      >
        <Fade in={openInstructions}>
          <Box sx={{
            bgcolor: 'background.paper',
            textAlign: 'center',
            position: 'absolute',
            width: '80%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Grid>
              <Grid 
                item
                sx={{
                  margin: '10px 0 0 210px'
                }}
              > 
                <i className="fas fa-times" onClick={handleClose}></i>
              </Grid>
            </Grid>
            <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
              Hangman is a guessing game where the player is given a hidden word and they have a certain amount of tries to guess the word. Select a letter to get started and try to guess the word before your guesses run out!
            </Typography>
          </Box>
        </Fade>
      </Modal>
  )
}

export default InstructionModal;