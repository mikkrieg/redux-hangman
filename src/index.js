import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux";
import store from "./redux/reduxIndex";
import "./css/App.css";
import Background from "./components/Background";
import { AppProvider } from './AppContext.js';

ReactDOM.render( 
  <AppProvider>
    <Provider store={store}>
      <Background />
      <App />
    </Provider>
  </AppProvider>,
  document.getElementById('root')
);
