import React from 'react';
import { createRoot } from 'react-dom/client';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { App } from './components/App/App';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Raleway', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
