import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'action', 'description', 'assignedTo', 'createdBy' ];
  tasks = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  async fetchTasks() {
    this.tasks = await this.tasksService.getTasks();
    
    /*const newTask = await this.tasksService.createTask({
      id: '5',
      action: 'Fake task #5',
      description: 'Fake desc #5',
      assignedTo: '1',
      createdBy: '1'
    });

    console.log(`New task: ${JSON.stringify(newTask)}`);*/
  }
}
