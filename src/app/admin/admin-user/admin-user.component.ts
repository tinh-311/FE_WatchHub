import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe((res: Array<User>) => {
      this.users = res;
      console.log('🏍️ ~ this.users: ', this.users)
    })
  }
}
