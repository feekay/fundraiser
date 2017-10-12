import { Component, OnInit } from '@angular/core';
import { CaseService } from "app/services/case.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { baseUrl } from "app/constants";

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {
  private files: any;
  private type: string;
  private errorMessage: any;
  private id: string;
  private Case: any;
  private base= baseUrl;
  constructor(private caseService: CaseService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.caseService.getCase(this.id).subscribe(
        Case => this.Case = Case,
        err => this.errorMessage = err
      );
    });
    if (this.location.path().includes('blood')) {
      this.type = 'blood'
    } else if (this.location.path().includes('cash')) {
      this.type = 'cash'
    } else if (this.location.path().includes('volunteer')) {
      this.type = 'volunteer'
    }
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
}
