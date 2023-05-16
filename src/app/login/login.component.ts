import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';
import { User } from '../model/user.model';
import { AuthenService } from 'src/service/authen.service';

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

  constructor(private router: Router, private authenService: AuthenService) {}

  ngOnInit() {
    const auth = getAuth();
    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('🏍️ ~ user 1: ', user);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  login() {
    this.router.navigate(['/home']);
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

    this.authenService.registerUser(this.user).subscribe((res) => {
      console.log('🏍️ ~ res: ', res);
    });
  }
}
