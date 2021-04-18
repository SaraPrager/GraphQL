import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'id', 'name', 'email', 'description' ];
  users = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  async fetchUsers() {
    this.users = await this.usersService.getUsers();
    /*await this.usersService.getUserByID("3");
    await this.usersService.getUserTasks("2");*/
  }
}