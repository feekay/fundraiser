import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Helper } from "app/services/helper";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private authService: AuthService,private router: Router) { }

  error: string = "";
  
  public login(username: string, pass: string): void {
    this.authService.login(username, pass).then(function (res) {
      this.authService.setToken(res.json()['data']['token']);
      this.router.navigate(['/']);
      this.error = "";
    }.bind(this)).catch(function (error) {
      console.log("An error occured ", error.json());
      this.error = error.json().message;
    }.bind(this));
  }

}
