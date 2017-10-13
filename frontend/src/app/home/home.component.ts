import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Case } from "app/models/case";
import { SearchService } from "app/services/search.service";
import { CaseService } from "app/services/case.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private tab = "blood";
  private cases: Case;
  private error: any;


  constructor(private searchService: SearchService, private caseService: CaseService, private route: ActivatedRoute) {

  }

  changeCaseType() {
    console.log(this.tab);
    this.caseService.changeRoute(this.tab);
    this.caseService.getCases().subscribe(
      cases => this.cases = cases,
      error => this.error = error.status
    );
  }
  ngOnInit() {
    this.caseService.changeRoute(this.tab);
    this.caseService.getCases().subscribe(
      cases => this.cases = cases,
      error => { this.error = error.status; console.log(this.error) }
    );
  }

  /*
    constructor(private authService: AuthService, private router: Router) {
      this.router.navigate(this.redirectRoute());
    }
  
    ngOnInit() {
    }
    redirectRoute(): string[] {
      switch (this.authService.getPermission()) {
        case PERMISSIONS.ADMIN:
        case PERMISSIONS.STAFF:
          return ["/dashboard"]
        case PERMISSIONS.TEACHER:
          return ["/teacher"]
        case PERMISSIONS.STUDENT:
          return ["/student"]
      }
    }
    */
}
