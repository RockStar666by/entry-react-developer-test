import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { client } from './apollo/apollo';
import { App } from './components/App/App';
import reportWebVitals from './reportWebVitals';

import { saveState, debounce } from './redux/localStorage';
import { store } from './redux/store';

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

const GlobalStyle = createGlobalStyle`
html {
  scrollbar-gutter: stable;
}

body {
  margin: 0;
  font-family: 'Raleway', 'Roboto Condensed', 'Source Sans Pro', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
