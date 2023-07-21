import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-admin-user-by-id',
  templateUrl: './admin-user-by-id.component.html',
  styleUrls: ['./admin-user-by-id.component.scss']
})
export class AdminUserByIdComponent {
  userId: number | undefined;
  user: any;

  constructor(
    private userService: UserService,
    private config: DynamicDialogConfig
    ) {

    }
  ngOnInit(): void {
    if (this.config.data) {
      const data = this.config.data.order;
      this.userId = data.user_id;
    }
    this.getUserById();
  }
 
  getUserById() {
    this.userService.getUserByID(this.userId).subscribe(
      (data: any) => {
        this.user = data;
        this.user = [this.user];
      },
      (err) => {
      }
    );
  }
}
