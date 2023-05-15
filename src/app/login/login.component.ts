import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/auth';
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';

export const firebaseConfig = {
  production: false,
  apiKey: "AIzaSyBEfkmx1fl2iy2EjYwNtW9eQcZR0oQLhuw",
  authDomain: "watchhub-386708.firebaseapp.com",
  projectId: "watchhub-386708",
  storageBucket: "watchhub-386708.appspot.com",
  messagingSenderId: "611260875244",
  appId: "1:611260875244:web:b91532a10fdda0a31cc0c9",
  measurementId: "G-V1V8N2RYNV"
};
initializeApp(firebaseConfig);
const auth = getAuth();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    const auth = getAuth();
    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập, chuyển trang tại đây
        this.router.navigate(['/home']); // Thay đổi '/home' thành đường dẫn mong muốn
      } else {
        // Người dùng chưa đăng nhập
      }
    });

    firebase.getRedirectResult(auth)
      .then((result: any) => {
        const user = result.user;
        if (user) {
          // Người dùng đã đăng nhập, bạn có thể lấy thông tin người dùng tại đây
          console.log('Thông tin người dùng:', user);
          this.router.navigate(['/home']);
        } else {
          // Người dùng chưa đăng nhập hoặc đã đăng xuất
        }
      })
      .catch((error) => {
      });
  }

  login() {
    // this.router.navigate(['/home']);
  }

  loginWithGitHub() {
    const provider = new firebase.GithubAuthProvider();
    const result =  firebase.signInWithRedirect(auth, provider);
    console.log('🏍️ ~ result: ', result)
  }

  loginWithGoogle() {
    const provider = new firebase.GoogleAuthProvider();
    const result =  firebase.signInWithRedirect(auth, provider);
    console.log('🏍️ ~ result: ', result)
  }

  loginWithFacebook() {
    const provider = new firebase.FacebookAuthProvider();
    const result =  firebase.signInWithRedirect(auth, provider);
    console.log('🏍️ ~ result: ', result)
  }
}
