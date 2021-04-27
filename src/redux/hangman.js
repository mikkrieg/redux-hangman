const state = {
  word: "epicodus", // [e, etc]
  numGuesses: 0,
  lettersCorrect: "", //[]
  isGameOver: false,
  limit: 10
}

export function guessLetter(letter) {
  return {
    type: "GUESS",
    payload: letter
  }
}

export default function wordReducer(state, action) {
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
        isGameOver: (state.word.sort() === state.lettersCorrect.sort() ? true : false) || (state.numGuesses === state.limit ? true : false),
        lettersCorrect: state.lettersCorrect += letters
      }
    default:
      return state;
  }
}

