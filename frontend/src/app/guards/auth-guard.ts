import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.authService.isAuthenticated().then(function (res) {
      return true;
    }).catch(function (err) {
      this.router.navigate(['/login']);
      return false;
    }.bind(this));
  }
}