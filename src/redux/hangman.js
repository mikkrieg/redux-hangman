const state = {
  word: "epicodus", // [e, etc]
  word2: "--------",
  numGuesses: 0,
  lettersCorrect: new Array(this.word.length), //[]
  isGameOver: false,
  limit: 10
}

export function guessLetter(letter) {
  return {
    type: "GUESS",
    payload: letter
  }
}

// function replaceAt(index, replacement, word) {
//   return word.substr(0, index) + replacement + word.substr(index + replacement.length);
// }

function replaceStuff(word, word2, letter){

  for (let i = 0; i < word.length; i++){
    if(word[i] === letter){
      word2[i] = word[i]
    }
  }
}

export default function wordReducer(state, action) {
  switch(action.type) {
    case "GUESS":

      let newWordsCorrect = state.

      return {
        ...state,
        numGuesses: state.numGuesses + 1,
        isGameOver: (state.word.sort() === state.lettersCorrect.join("").sort() ? true : false) || (state.numGuesses === state.limit ? true : false),
        lettersCorrect:   replaceAt(state.word.indexOf(action.payload), action.payload, state.word)
      }
    default:
      return state;
  }
}

