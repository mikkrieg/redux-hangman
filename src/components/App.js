import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { guessLetter, resetGame } from "../redux/hangman";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import EndModal from './EndModal.js';
import InstructionModal from './InstructionModal';
import { AppContext } from '../AppContext';
import Grid from "@mui/material/Grid";

function App(props) {
  const [bigScreen, setBigScreen] = useState(false);
  const { setOpenInstructions, setOpenFinish, setLose } = useContext(AppContext);

  const windowListener = () => {
    if(window.innerWidth > 960) {
      setBigScreen(true);
    } else {
      setBigScreen(false);
    }
  }
  window.onresize = windowListener;

  const openInstructionModal = () => {
    setOpenInstructions(true);
  }

  let abc = "abcdefghijklmnopqrstuvwxyz".split("");

  let renderLetterButtons = (abc) => abc.map((letter, index) => {
    if(index === abc.length - 2 || index === abc.length - 1) {
      return (
        <>
          <Grid 
            item 
            xs={3} 
            md={2} 
            justify='center'
            sx={{
              paddingLeft: {
                xs: '20px'
              }
            }}
          >
            <Button
              key={index}
              color="primary" 
              variant="contained" 
              size= {bigScreen ? 'large' : 'small'} 
              id={index} 
              className="letter-btn"
              onClick={() => props.guessLetter(letter)}
              disabled={props.lettersCorrect.includes(letter) || props.lettersIncorrect.includes(letter) || props.isGameOver}
              sx={{
                // justifyContent: 'in-between',
                // marginLeft: { 
                //   xs: 9.1, 
                //   sm: 12.5, 
                //   md: 24.3
                // }
              }}
              >
                {letter.toUpperCase()}
            </Button>
          </Grid>
        </>
      )
    } else {
      return (
        <>
          <Grid 
            item 
            xs={3} 
            md={2} 
            justify='center'
            sx={{
              paddingLeft: {
                xs: '200px'
              }
            }}
          > 
            <Button
              key={index}
              color="primary" 
              variant="contained" 
              size= {bigScreen ? 'large' : 'small'} 
              id={index} 
              className="letter-btn"
              onClick={() => props.guessLetter(letter)}
              disabled={props.lettersCorrect.includes(letter) || props.lettersIncorrect.includes(letter) || props.isGameOver}
              sx={{
                // marginLeft: { 
                //   md: 1
                // }
              }}
              >
                {letter.toUpperCase()}
            </Button>
          </Grid>
        </>
      )
    }
  });
  let renderHangMan = (word) => word.split("").map(letter => {
    return !props.lettersCorrect.includes(letter) 
            ? 
            <span className={ bigScreen ? "guesses" : 'mobile-guess'}>_ </span> 
            : 
            <span className={ bigScreen ? "guesses" : 'mobile-guess'}>{letter.toUpperCase()}</span>;
  })

  let gameOver = () => {
    if(props.isGameOver || props.isWinner()) {
      if(props.isWinner()) {
        setLose(false);
        setOpenFinish(true);
        return "WON"
      } else {
        setOpenFinish(true);
        setLose(true);
        return "LOST"
      }
    }
  }
  

  return (
    <Container 
      maxWidth="sm" 
    >
      <Typography 
        variant='h1'
        sx={{
          fontFamily: 'Exo, sans-serif',
          zIndex: 21,
          fontSize: {
            xs: '1.6em', 
            md: '3em'
          },
          position: 'relative',
          textAlign: 'center',
          paddingTop: {
            xs: 6, 
            md: 20
          }
        }}
      >
        Welcome To Hangman
      </Typography>
      <Button
        variant='contained'
        size='small'
        sx={{
          display: 'flex',
          margin: 'auto',
          marginTop: '15px',
        }}
        onClick={openInstructionModal}
      >
        Instructions
      </Button>
      <Typography
        variant='h1'
        mt={2}
        mb={-2}
        sx={{
          fontSize: {
            xs: '1.5em', 
            md: '3em'
          }
        }}
      >
        Remaining Guesses: {props.limit() - props.numGuesses}
      </Typography>
      <Typography 
      className="word" 
      variant='h2' 
      mt={3} 
      sx={{ 
        fontSize: '1.5em', 
        fontWeight: 'bold'
      }}
      >
        {renderHangMan(props.word)}
      </Typography>
      <br />
      <br />
      <Grid 
        container
        justifyContent='center'
        alignItems='center'
        spacing={1} 
        mt={-4}
        sx={{
          paddingLeft: '20px'
        }}
      >
        {renderLetterButtons(abc)}
      </Grid>
      <Grid 
          container 
          justifyContent="center"
          alignItems="center" 
        >
          <Button 
          sx={{
            marginTop: '20px', 
          }} 
          variant="contained" 
          color="error" 
          size='large' 
          onClick={() => props.resetGame()} > Reset </Button>
        </Grid>
      <EndModal 
        message={gameOver()} 
        reset={props.resetGame} 
        word={props.word} 
      />
      <InstructionModal />      
    </Container>
    );
}

function mapStateToProps(state) {
  return {
    word: state.word, 
    numGuesses: state.numGuesses,
    lettersCorrect: state.lettersCorrect, 
    isGameOver: state.isGameOver,
    limit: state.limit,
    lettersIncorrect: state.lettersIncorrect,
    isWinner: state.isWinner,

  }
}

const mapDispatchToProps = {
  guessLetter: guessLetter,
  resetGame: resetGame,
}

// connect(Parts of State you need, Actions you want to perform)
export default connect(mapStateToProps, mapDispatchToProps)(App);
