import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent {
  verifyForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  onClickSubmit() {
    this.loadingService.showLoading();
    this.userService
      .verify(this.verifyForm.value?.email, this.verifyForm.value?.code)
      .subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.router.navigate(['/login']);
        },
        (err) => {
          this.toastService.showMessage(
            ToasSumary.Error,
            err?.error?.message,
            ToastType.Error
          );
          this.loadingService.hideLoading();
        }
      );
  }
}
