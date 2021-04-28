import { createStore } from "redux";
import hangmanReducer from "./hangman";

const store =  createStore(hangmanReducer);
store.subscribe(() => console.log(store.getState()));
export default store;
