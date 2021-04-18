import { Injectable } from '@angular/core';
import { GraphQLClientService } from './graphql-client.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private graphQLClientService: GraphQLClientService) {
  }

  async getTasks() {
    const query = `{
      tasks {
        id
        action
        description
        assignedTo {
          name
        }
        createdBy {
          name
        }
      }
    }`
    
    return (await this.graphQLClientService.sendRequest(query)).tasks;
  }

  async createTask(input) {
    const mutation = `
    mutation createTask($input: CreateTaskInput) {
      task: createTask(input: $input) {
        action
      }
    }`;
  
    return (await this.graphQLClientService.sendRequest(mutation, { input })).task;
  }
}