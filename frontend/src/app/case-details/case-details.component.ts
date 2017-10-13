import { Component, OnInit } from '@angular/core';
import { CaseService } from "app/services/case.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { baseUrl } from "app/constants";
import { UserService } from "app/services/user.service";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css'],
})
export class CaseDetailsComponent implements OnInit {
  private currentUser: any;
  private files: any;
  private type: string;
  private errorMessage: any;
  private id: string;
  private Case: any;
  private base = baseUrl;
  private repoUrl;
  constructor(private caseService: CaseService, private meta: Meta, private userService: UserService, private router: Router, private route: ActivatedRoute, private location: Location) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      if (this.location.path().includes('blood')) {
        this.type = 'blood'
      } else if (this.location.path().includes('cash')) {
        this.type = 'cash'
      } else if (this.location.path().includes('volunteer')) {
        this.type = 'volunteer'
      }
      this.caseService.changeRoute(this.type);
      this.caseService.getCase(this.id).subscribe(
        Case => {
          this.Case = Case; console.log(Case);
          this.meta.addTag({ name: 'twitter:card', content: 'summary' });

          this.meta.addTag({ property: 'og:url', content: location.href });
          this.meta.addTag({ property: 'og:title', content: Case.Case.title });
          this.meta.addTag({ property: 'og:description', content: Case.Case.description });
          this.meta.addTag({ property: 'og:image', content: this.base + '/' + Case.Case.Attachments[0].related_file });

          this.meta.addTag({ name: 'twitter:title', content: Case.Case.title });
          this.meta.addTag({ name: 'twitter:description', content: Case.Case.description });
          this.meta.addTag({ name: 'twitter:image:src', content: this.base + '/' + Case.Case.Attachments[0].related_file });
        },
        err => { this.router.navigate(['/404']) }
      );
      this.userService.getMyProfile().subscribe(
        user => this.currentUser = user,
        err => this.currentUser = null
      );
      this.repoUrl = location.href;
    });
  }
  updateCase() {
    let formData: FormData = new FormData();
    for (let file of this.files) {
      formData.append('photos', file, file.name);
    }
    this.caseService.updateCase(this.id, formData)
      .then(function () {
        this.caseService.getCase(this.id).subscribe(
          Case => this.Case = Case,
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
  postComment(text: string) {
    if (this.currentUser) {
      this.caseService.postComment(this.Case.Case.id, text).then(function () {
        //CLEAR COMMENT FIELD AND UPDATE PAGE
        this.Case.Case.Comments.push({ text: text, createdAt: Date.now() });
        console.log("success");
      }.bind(this)).catch(onerror);
    }
  }
}