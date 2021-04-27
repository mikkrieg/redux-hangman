import { render } from "@testing-library/react";
import React from "react";
import { connect } from "react-redux";
import { guessLetter } from "../redux/hangman";

function App(props) {
  let abc = "abcdefghijklmnopqrstuvwxyz".split("");
  let renderLetterButtons = (abc) => abc.map((letter, index) => {
    return <button type="button" id={index}>{letter}</button>
  });

  let renderHangMan = (word) => word.split("").map(letter => {
    return !props.lettersCorrect.includes(letter) ? <span>_ </span> : <span>{letter}</span>;
  })

  return (
    <>
      <h1>Welcome To Hangman</h1>
      <h1>Number of Guesses: {props.numGuesses}</h1>
      {renderHangMan(props.word)}
      <br />
      <br />
      <hr />
      {renderLetterButtons(abc)}
    </>
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
