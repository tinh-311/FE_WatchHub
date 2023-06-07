import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {
  users: any = [];
  currentPage: any = 1;
  rowsPerPage: any = 1;
  totalCount: number = 0;
  isLoading: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUser();
  }

  onPageChanged(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage, this.rowsPerPage).subscribe(
      (data: any) => {
        console.log('🏍️ ~ data: ', data);
        this.totalCount = data?.totalCount;
        this.users = data?.res;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
