import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const URL = 'http://localhost:3000/graphql'

@Injectable({
  providedIn: 'root'
})
export class GraphQLClientService {
  constructor(private authService: AuthService) {
  }

  async sendRequest(query, variables?) {
    const request = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    };

    if (this.authService.accessToken) {
      request.headers['authorization'] = `Bearer ${this.authService.accessToken}`;
    }

    const response = await fetch(URL, request);

    const responseBody = await response.json();
    if (responseBody.errors) {
      const message = responseBody.errors.map(err => err.message).join('\n')
      throw new Error(`Errors from GraphQL server: ${message}`);
    }

    return responseBody.data;
  }
}
