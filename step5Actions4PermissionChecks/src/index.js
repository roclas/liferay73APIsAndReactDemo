import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const username="test@liferay.com";
const password="test1";
const b64=Buffer.from(`${username}:${password}`).toString('base64');

const client = new ApolloClient({
  uri: 'http://localhost:8080/o/graphql',
  cache: new InMemoryCache(),
  headers: {"Authorization": "Basic "+b64}
});

ReactDOM.render(
  <ApolloProvider client={client}><App/></ApolloProvider>,
  document.getElementById('root'),
);
