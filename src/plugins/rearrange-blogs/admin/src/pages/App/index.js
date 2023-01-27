/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const App = () => {
  const client = new ApolloClient({
    uri: `${process.env.BACKEND_URL}/graphql`,
    cache: new InMemoryCache()
  });
  return (
    <div>
      <ApolloProvider client={client}>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
      </ApolloProvider>
    </div>
  );
};

export default App;
