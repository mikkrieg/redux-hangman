import React, { useState } from "react";
import { connect } from "react-redux";
import { guessLetter, resetGame } from "../redux/hangman";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function App(props) {
  const [bigScreen, setBigScreen] = useState(false);

  const windowListener = () => {
    if(window.innerWidth > 960) {
      setBigScreen(true);
    } else {
      setBigScreen(false);
    }
  }

  window.onresize = windowListener;

  let abc = "abcdefghijklmnopqrstuvwxyz".split("");

  let renderLetterButtons = (abc) => abc.map((letter, index) => {
    
    return (
      <>
        <Grid item xs={3} md={2}> {/* xs sm md lg xl */}
          <Button
            key={index}
            color="primary" 
            variant="contained" 
            size= {bigScreen ? 'large' : 'small'} 
            id={index} 
            className="letter-btn"
            onClick={() => props.guessLetter(letter)}
            disabled={props.lettersCorrect.includes(letter) || props.lettersIncorrect.includes(letter) || props.isGameOver}
            >
              {letter.toUpperCase()}
          </Button>
        </Grid>
      </>
    )

  });
  let renderHangMan = (word) => word.split("").map(letter => {
    return !props.lettersCorrect.includes(letter) 
            ? 
            <span className={ bigScreen ? "guesses grow" : 'mobile-guess'}>_ </span> 
            : 
            <span className={ bigScreen ? "guesses grow" : 'mobile-guess'}>{letter.toUpperCase()}</span>;
  })

  let gameOverMsg = () => {
    if(props.isGameOver || props.isWinner()) {
      if(props.isWinner()) {
        return "WON"
      } else {
        return "LOST"
      }
    }
  }
  

  return (
    <Container maxWidth="sm" className="game">
      {console.log(props)}
      {console.log(gameOverMsg() !== undefined ? gameOverMsg().toLowerCase() : "notDone")}
      <Typography 
        variant='h1'
        pt={4}
        sx={{
          // color: '#FFF',
          fontFamily: 'Exo, sans-serif',
          zIndex: 21,
          fontSize: {
            xs: '1.6em', 
            md: '3em'
          },
          position: 'relative',
          textAlign: 'center'
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
      >
        Instructions
      </Button>
      <Typography
        className={ bigScreen ? 'grow' : ''}
        variant='h1'
        mt={2}
        mb={-2}
        sx={{
          fontSize: {
            xs: '1.5em', 
            md: '4em'
          }
        }}
      >
        Remaining Guesses: {props.limit() - props.numGuesses}
      </Typography>
      <Grid
        container 
        justify="center"
        alignItems="center" 
      >
        <h1 
          className={gameOverMsg() !== undefined ? gameOverMsg().toLowerCase() : "notDone"}
          >
            YOU {gameOverMsg()}
        </h1>
      </Grid>
      <Typography className="word" variant='h2' mt={3} sx={{ fontSize: '1.5em', fontWeight: 'bold'}}>{renderHangMan(props.word)}</Typography>
      <br />
      <br />
      <Grid container spacing={1} mt={-4}>
        {renderLetterButtons(abc)}
        <Grid 
          container 
          justify="center"
          alignItems="center" 
        >
          <Button sx={{margin: 'auto', marginTop: '10px', display: 'flex'}} variant="contained" color="error" onClick={() => props.resetGame()} > Reset </Button>
        </Grid>
      </Grid>      
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
