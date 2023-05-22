import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';
import { User } from '../model/user.model';
import { AuthenService } from 'src/service/authen.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/service/loading.service';
import { ToastService } from 'src/service/toast.service';
import { ToasSumary, ToastType } from 'src/service/constant/toast.constant';

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
        console.log('🏍️ ~ user 1: ', user);
        this.router.navigate(['']);
      } else {
      }
    });
  }

  login() {
    this.loadingService.showLoading();
    const auth = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authenService.login(auth).subscribe(
      (res) => {
        this.toastService.showMessage(ToasSumary.Success, 'Đăng nhập thành công', ToastType.Success);
        localStorage.setItem('token', res?.token);
        this.loadingService.hideLoading();
        this.router.navigate(['']);
      },
      (err) => {
        this.toastService.showMessage(ToasSumary.Error, err?.error?.message, ToastType.Error);
        this.loadingService.hideLoading();
      }
    );
  }

  async loginWithGoogle() {
    const provider = new firebase.GoogleAuthProvider();
    const result: any = await firebase.signInWithPopup(this.auth, provider);

    this.user = {
      username: result?.user?.displayName,
      password: result?.user?.uid,
      fullname: result?.user?.displayName,
      email: result?.user?.email,
      phone: result?.user?.phoneNumber || '0123456789',
      address: result?.user?.email,
    } as User;

    // this.authenService.registerUser(this.user).subscribe((res) => {
    //   console.log('🏍️ ~ res gg: ', res);
    // }, (err) => {
    //   console.log('🏍️ ~ err login w gg: ', err)
    // });
  }
}
