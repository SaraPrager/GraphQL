import { Injectable } from '@angular/core';
import { GraphQLClientService } from './graphql-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private graphQLClientService: GraphQLClientService) {
  }

  async getUsers() {
    const query = `{
      users {
        id
        name
        email
        description
      }
    }`
    
    return (await this.graphQLClientService.sendRequest(query)).users;
  }

  async getUserByID(id: string) {
    const query = `query userQuery($id: ID!) {
      user(id: $id) {
        email
      }
    }`
    
    return (await this.graphQLClientService.sendRequest(query, { id })).user;
  }

  async getUserTasks(id: string) {
    const query = `query userTasksQuery($id: ID!) {
      user(id: $id) {
        tasks {
          action
        }
      }
    }`
    
    return (await this.graphQLClientService.sendRequest(query, { id })).user;
  }
}
