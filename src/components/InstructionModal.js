import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { AppContext } from '../AppContext';

const InstructionModal = () => {
  const { openInstructions, setOpenInstructions } = useContext(AppContext);
  
  const handleClose = () => setOpenInstructions(false);

  return (
    <Modal
    lassName='modal-highlight'
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
          <Box 
            sx={{
              bgcolor: 'background.paper',
              textAlign: 'center',
              position: 'absolute',
              width: {
                xs: '80%', 
                sm: '60%', 
                md: '40%', 
                lg:'30%', 
                xl: '20%'
              },
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Grid>
              <Grid 
                item
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: '4% 4% 0 0',
                  // margin: { xs:'10px 0 0 210px', md:'15px 0 -20px 340px'},
                  cursor: 'pointer'
                }}
              > 
                <i className="fas fa-times" onClick={handleClose}></i>
              </Grid>
            </Grid>
            <Typography 
              id="modal-modal-title" 
              variant="h6" 
              component="h2"
              mb={2} 
              sx={{
                padding: {
                  xs: 1, 
                  md: 3
                }
              }}
            >
              Hangman is a guessing game where the player is given a hidden word and they have a certain amount of tries to guess the word. Select a letter to get started and try to guess the word before your guesses run out!
            </Typography>
          </Box>
        </Fade>
      </Modal>
  )
}

export default InstructionModal;