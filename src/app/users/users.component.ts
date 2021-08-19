import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService, User } from '../authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  $users: Observable<User[]> = new Observable();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.$users = this.authService.getRegisteredUsers();
  }
}
