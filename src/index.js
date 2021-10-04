import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import groupReducer from 'reducers/groupReducer.js'
import './index.css';
import { AuthProvider } from 'contexts/AuthContext'
import reportWebVitals from './reportWebVitals'
import { createTheme, ThemeProvider } from '@mui/material';

const store = createStore(groupReducer, composeWithDevTools(applyMiddleware(thunk)))
const theme = createTheme()
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
