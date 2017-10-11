import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.authService.isAuthenticated().then(function (res) {
   //   this.router.navigate(['/dashboard']);
      return false;
    }).catch(function (err) {
      return true;
    }.bind(this));
  }
}