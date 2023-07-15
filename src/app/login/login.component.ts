import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';
import { User } from '../model/user.model';
import { AuthenService } from 'src/service/authen.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';
import jwt_decode from 'jwt-decode';

initializeApp(firebaseConfig);
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  auth = getAuth();
  firebaseConfig = firebaseConfig;
  user: any;

  loginForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private authenService: AuthenService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const auth = getAuth();
    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        this.router.navigate(['']);
      } else {
      }
    });

    const token = localStorage.getItem('token');
    if (token) {
      const currentUser = jwt_decode(token);
      if (currentUser) {
        this.router.navigate(['']);
      }
    }
  }

  login() {
    this.loadingService.showLoading();
    const auth: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authenService.login(auth).subscribe(
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

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setTimeout(() => {
          location.href = location.href;
        }, 100);
      })
      .catch((error) => {
      });
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
      phone: result?.user?.phoneNumber || '',
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
        this.router.navigate(['/home']);
      },
      (err) => {
        this.toastService.showMessage(
          ToasSumary.Error,
          err?.error?.message,
          ToastType.Error
        );
        this.logout();
        this.loadingService.hideLoading();
      }
    );
  }
}
