import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'name', 'email', 'description' ];
  users = [
    {
        "id": "1",
        "name": "User #1",
        "email": "user1@gmail.com",
        "description": "User #1 description"
    },
    {
        "id": "2",
        "name": "User #2",
        "email": "user2@gmail.com",
        "description": "User #2 description"
    },
    {
        "id": "3",
        "name": "User #3",
        "email": "user3@gmail.com",
        "description": "User #3 description"
    },
    {
        "id": "4",
        "name": "User #4",
        "email": "user4@gmail.com",
        "description": "User #4 description"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}