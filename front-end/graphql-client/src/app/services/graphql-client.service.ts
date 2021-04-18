import { Injectable } from '@angular/core';

const URL = 'http://localhost:3000/graphql'

@Injectable({
  providedIn: 'root'
})
export class GraphQLClientService {
  constructor() {
  }

  async sendRequest(query, variables?) {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const responseBody = await response.json();
    if (responseBody.errors) {
      const message = responseBody.errors.map(err => err.message).join('\n')
      throw new Error(`Errors from GraphQL server: ${message}`);
    }

    return responseBody.data;
  }
}
