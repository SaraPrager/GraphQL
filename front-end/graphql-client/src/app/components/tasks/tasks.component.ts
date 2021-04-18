import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'action', 'description', 'assignedTo', 'createdBy' ];
  tasks = [
    {
        "id": "1",
        "action": "Fake Task #1",
        "description": "This is a fake task #1",
        "assignedTo": "1",
        "createdBy": "2"
    },
    {
        "id": "2",
        "action": "Fake Task #2",
        "description": "This is a fake task #2",
        "assignedTo": "2",
        "createdBy": "3"
    },
    {
        "id": "3",
        "action": "Fake Task #3",
        "description": "This is a fake task #3",
        "assignedTo": "3",
        "createdBy": "4"
    },
    {
        "id": "4",
        "action": "Fake Task #4",
        "description": "This is a fake task #4",
        "assignedTo": "4",
        "createdBy": "1"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
