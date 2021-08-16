import React from "react";
import { connect } from "react-redux";
import { guessLetter, resetGame } from "../redux/hangman";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function App(props) {
  let abc = "abcdefghijklmnopqrstuvwxyz".split("");
  // function addStyle(id) {
  //   document.getElementById(id).classList.add("shrink");

  //   ///document.getElementById(id).style.width= keg.volume + "px";
  // }
  let renderLetterButtons = (abc) => abc.map((letter, index) => {
    
    return (
      <>
        <Grid item xs={2}> {/* xs sm md lg xl */}
          <Button
            key={index}
            color="primary" 
            variant="contained" 
            size="large" 
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
            <span className="guesses grow">_ </span> 
            : 
            <span className="guesses grow">{letter.toUpperCase()}</span>;
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
      <h1>Welcome To Hangman</h1>
      <h1 className="grow">Number of Guesses Remaining: {props.limit() - props.numGuesses}</h1>
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
     
      <h2 className="word">{renderHangMan(props.word)}</h2>
      <br />
      <br />
      <Grid container spacing={1}>
        {renderLetterButtons(abc)}
        <Grid 
          container 
          justify="center"
          alignItems="center" 
        >
          <Button variant="contained" color="secondary" onClick={() => props.resetGame()} > Reset </Button>
        </Grid>
      </Grid>      
    </Container>
    );
}

function mapStateToProps(state) {
  return {
    word: state.word, // [e, etc]
    numGuesses: state.numGuesses,
    lettersCorrect: state.lettersCorrect, //[]
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
