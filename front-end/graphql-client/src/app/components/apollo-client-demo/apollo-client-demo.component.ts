import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';

// Fragment
const TASK_FRAGMENT = gql`
  fragment TaskDetail on Task {
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
`;

// Query
const GET_TASKS = gql`
  query getTasks {
    tasks {
      ...TaskDetail
    }
  }
  ${TASK_FRAGMENT}
`;

// Mutation
const CREATE_TASK = gql`
  mutation createTask($input: CreateTaskInput) {
    task: createTask(input: $input) {
      ...TaskDetail
    }
  }
  ${TASK_FRAGMENT}
`;

@Component({
  selector: 'app-apollo-client-demo',
  templateUrl: './apollo-client-demo.component.html',
  styleUrls: ['./apollo-client-demo.component.css']
})
export class ApolloClientDemoComponent implements OnInit {
  tasks: Observable<any>;
  constructor(private apollo: Apollo) { }

  // apollo.query({ query, variales })
  // apollo.mutate({ mutation, variales })
  // Add authentication

  ngOnInit(): void {
   this.fetchTasks();
   this.createTask();
  }

  fetchTasks() {
    this.tasks = this.apollo
    .watchQuery({
      query: GET_TASKS,
      // Configure cache policy
      fetchPolicy: 'cache-first',
      // Polling:
      // pollInterval: 500,
    })
    .valueChanges.pipe(map((result: any) => result?.data?.tasks));
  }

  createTask() {
    this.apollo.mutate({ mutation: CREATE_TASK, variables: {
        input: {
          id: '10',
          action: 'Fake task #10',
          description: 'Fake desc #10',
          assignedTo: '2',
          createdBy: '2'
        }
      },
      /*update: (cache, { data }) => {
        cache.writeQuery({ query: GET_TASKS, data })
      }*/
    }).subscribe(response => {
      console.log(`response: ${JSON.stringify(response)}`);
    })
  }
}
