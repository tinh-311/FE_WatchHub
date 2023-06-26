import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  currentUser: any;

  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      const user: any = jwt_decode(token);
      return this.userService
        .getUserByID(user?.id)
        .pipe(
          map((data: any) => {
            this.currentUser = data;
            console.log('🏍️ ~ this.currentUser: ', this.currentUser);
            return this.currentUser.is_admin;
          })
        )
        .toPromise();
    }

    return false;
  }
}
