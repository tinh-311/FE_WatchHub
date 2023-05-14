import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private oauthService: OAuthService) {
  }

  login() {
    // this.router.navigate(['/home']);
    this.oauthService.initLoginFlow();
  }
}
