import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppContext } from '../AppContext';

const EndModal = (props) => {
  const { openFinish, setOpenFinish, lose } = useContext(AppContext);
  const [ color, setColor ] = useState(null);
  const message = props.message;

  useEffect(() => {
    if(props.message === "LOST") {
      setColor(true);
    } else {
      setColor(false); 
    }
  }, [props.message])

  const playAgain = () => {
    props.reset();
    handleClose();
  }
  
  const handleClose = () => {
    setOpenFinish(false);
    const content = document.getElementsByClassName('modal-content');
    while(content.length > 0) {
      content[0].parentNode.removeChild(content[0]);
    }
  }

  return (
    <Modal
    disableAutoFocus={true}
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={openFinish}
    closeAfterTransition
    BackdropComponent={Backdrop}
    disableBackdropClick
    BackdropProps={{
      timeout: 5000,
    }}
      >
        <Fade in={openFinish}>
        <Box 
        sx={{
            color: (color ? '#FF0000' : '#33cc33'),
            textAlign: 'center',
            position: 'absolute',
            width: '80%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography 
            id="modal-modal-title" 
            className='modal-content' 
            variant="h3" 
            component="h2" 
            sx={{
              fontWeight: 'bold', 
              marginTop: {
                xs: 10, 
                md: 0
              }
            }}
          >
            YOU {message}!
          </Typography>
          <br/>
          <Typography 
            variant='h4' 
            className='modal-content' 
            sx={{ 
              fontWeight: 'bold'
            }} 
            mb={3}
          >
            {lose ? "The word was " + props.word.toUpperCase() : ''}
          </Typography>
          <Button 
            className='modal-content' 
            variant='contained' 
            color='success' 
            sx={{
              marginBottom: '15px'
            }} 
            onClick={playAgain}
          >
            Play Again!
          </Button>
        </Box>
        </Fade>
      </Modal>
  )
}

export default EndModal;