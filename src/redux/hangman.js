import wordBank from "../data/wordBank";

const hangmanState = {
  word: wordBank[Math.floor(Math.random() * (wordBank.length - 1))], 
  modalOpen: false,
  numGuesses: 0,
  lettersCorrect: "", 
  lettersIncorrect: "",
  isGameOver: false,
  isWinner: function() {
    return this.word.split("").sort().join("") === this.lettersCorrect.split("").sort().join("");
  },
  limit: function() {
    return this.word.length + 5;
  }
};

export function guessLetter(letter = '') {
  return {
    type: "GUESS",
    payload: letter
  }
}

export function resetGame(){
  return {
    type: "RESET_GAME"
  }
}

export default function hangmanReducer(state = hangmanState, action) {
  switch(action.type) {
    case "GUESS":

      let letters = "";
      state.word.split("").forEach(letter => {
        if(letter === action.payload) {
          letters += letter;
        }
      });

      return {
        ...state,
        numGuesses: state.numGuesses + 1,
        isGameOver: (state.word.split("").sort().join("") === state.lettersCorrect.split("").sort().join("") ? true 
          : false) || ((state.numGuesses + 1) === state.limit() ? true 
            : false),
        lettersCorrect: state.lettersCorrect += letters,
        lettersIncorrect: state.lettersIncorrect += (!state.lettersCorrect.includes(action.payload) ? action.payload : '')
      }

    case "RESET_GAME":
      return {
        word: wordBank[Math.floor(Math.random() * (wordBank.length - 1))], 
        numGuesses: 0,
        lettersCorrect: "", 
        lettersIncorrect: "",
        isGameOver: false,
        isWinner: function() {
          return this.word.split("").sort().join("") === this.lettersCorrect.split("").sort().join("");
        },
        limit: function() {
          return this.word.length + 5;
        }
      }
    
    default:
      return state;
  }
}

