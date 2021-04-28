const hangmanState = {
  word: "epicodus", // [e, etc]
  numGuesses: 0,
  lettersCorrect: "", //[]
  lettersIncorrect: "",
  isGameOver: false,
  limit: "epicodus".length + 5
};

export function guessLetter(letter) {
  return {
    type: "GUESS",
    payload: letter
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
        isGameOver: (state.word.split("").sort().join("") === state.lettersCorrect
        .split("").sort().join("") ? true : false) || ((state.numGuesses + 1) === state.limit ? true : false),
        lettersCorrect: state.lettersCorrect += letters,
        lettersIncorrect: state.lettersIncorrect += (!state.lettersCorrect.includes(action.payload) ? action.payload : '')
      }
    default:
      return state;
  }
}

