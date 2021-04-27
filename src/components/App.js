import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { guessLetter } from "../redux/hangman";

import "../css/App.css";

function App(props) {
  let abc = "abcdefghijklmnopqrstuvwxyz".split("");
  function addStyle(id) {
    document.getElementById(id).classList.add("shrink");

    ///document.getElementById(id).style.width= keg.volume + "px";
  }
  let renderLetterButtons = (abc) => abc.map((letter, index) => {
    
    return (
      <Grid item xs={2}>
        <Button
          color="primary" 
          variant="contained" 
          size="large" 
          id={index} 
          className="letter-btn"
          /* onClick={(addStyle(index))} */
          >
            {letter.toUpperCase()}
        </Button>
      </Grid>
    )

  });
  let renderHangMan = (word) => word.split("").map(letter => {
    return !props.lettersCorrect.includes(letter) 
            ? 
            <span className="guesses grow">_ </span> 
            : 
            <span className="guesses grow">{letter.toUpperCase()}</span>;
  })

  return (
    <Container maxWidth="sm">
      <h1>Welcome To Hangman</h1>
      <h1 className="grow">Number of Guesses: {props.numGuesses}</h1>
      <h2 className="word">{renderHangMan(props.word)}</h2>
      <br />
      <br />
      <Grid container spacing={1}>
        {renderLetterButtons(abc)}
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
    limit: state.limit
  }
}

const mapDispatchToProps = {
  guess: guessLetter
}

// connect(Parts of State you need, Actions you want to perform)
export default connect(mapStateToProps, mapDispatchToProps)(App);
