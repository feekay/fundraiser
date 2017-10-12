import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user.service";
import { baseUrl } from "app/constants";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private files: FileList;
  private errorMessage: any;
  private user: any;
  private base = baseUrl+'/';
  private username = "";
  constructor(private userService: UserService) {
    this.userService.getMyProfile().subscribe(
      user => this.user = user,
      err => this.errorMessage = err
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    let file: File = this.files[0];
    let formData: FormData = new FormData();
    formData.append('profilePhoto', file, file.name);
    formData.append('username', this.username);
    this.userService.updateMyProfile(formData)
      .then(function () {
        this.userService.getMyProfile().subscribe(
          user => this.user = user,
          err => this.errorMessage = err
        );
      }.bind(this))
      .catch(onerror);

  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.files = fileList;
    }
  }
}
