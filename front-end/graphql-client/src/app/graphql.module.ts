import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const GRAPHQL_SERVER = 'localhost:3000/graphql';
const HTTP_URL = `http://${GRAPHQL_SERVER}`;
const WS_URL =`ws://${GRAPHQL_SERVER}`;

function isSubscription(operation) {
  const definition = getMainDefinition(operation.query);
  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // TODO: add authorization
  const _httpLink = httpLink.create({ uri: HTTP_URL });
  // lazy: true, websocket is initiated only when subscription is requested
  const _wsLink = new WebSocketLink({ uri: WS_URL, options: { lazy: true, reconnect: true } });

  return {
    link: split(isSubscription, _wsLink, _httpLink),
    cache: new InMemoryCache(),
    // can use local storage
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
