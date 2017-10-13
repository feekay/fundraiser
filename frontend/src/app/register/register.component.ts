import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  error: string = "";
  public register(name: string, mail: string, pass: string) {
    this.authService.signup(name, mail, pass).then(function (res) {
      this.authService.setToken(res.json()['data']['token']);
      // this.authService.setId(res.json()['id']);
      this.router.navigate(['/']);
      this.error = "";
    }.bind(this)).catch(function (error) {
      console.log("An error occured ", error);
      this.error = "Username already in use";
    }.bind(this));
  }
}