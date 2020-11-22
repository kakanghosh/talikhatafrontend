import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18n';
import 'fontsource-roboto';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { TOKEN } from './core/constants/appconstants';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/query',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN.ACCESS_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? 'Bearer '.concat(token) : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
