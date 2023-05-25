import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthenService } from 'src/service/authen.service';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import * as firebase from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';

initializeApp(firebaseConfig);
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  auth = getAuth();
  firebaseConfig = firebaseConfig;

  registerForm: any = this.fb.group(
    {
      // phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      yourName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.passwordMatchValidator,
    }
  );

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private authenService: AuthenService
  ) {}

  register() {
    this.loadingService.showLoading();

    const user = {
      fullname: this.registerForm.value.yourName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.registerUser(user).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.toastService.showMessage(
          ToasSumary.Success,
          'Đăng ký thành công',
          ToastType.Success
        );
        this.router.navigate(['/verify']);
      },
      (err) => {
        this.loadingService.hideLoading();
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.error?.message,
          ToastType.Error
        );
      }
    );
  }

  async loginWithGoogle() {
    this.loadingService.showLoading();
    const provider = new firebase.GoogleAuthProvider();
    const result: any = await firebase.signInWithPopup(this.auth, provider);

    const ggUser: User = {
      uid: result?.user?.uid,
      name: result?.user?.displayName,
      picture: result?.user?.photoURL,
      email: result?.user?.email,
      phone: result?.user?.phoneNumber || '000',
    };

    this.authenService.registerWithGoogle(ggUser).subscribe(
      (res) => {
        this.toastService.showMessage(
          ToasSumary.Success,
          'Đăng nhập thành công',
          ToastType.Success
        );
        localStorage.setItem('token', res?.token);
        this.loadingService.hideLoading();
        this.router.navigate(['']);
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

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }
}
