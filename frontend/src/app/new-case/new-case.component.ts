import { Component, OnInit } from '@angular/core';
import { CaseService } from "app/services/case.service";
import { Helper } from "app/services/helper";

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.css']
})
export class NewCaseComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  ngOnInit() {
  }

  addCase(type: string, caseObject) {
    if (Helper.validateCase(type, caseObject)) {
      this.caseService.changeRoute(type);
      this.caseService.registerCase(caseObject).then(function () {
        this.router.navigate(['/home']);
      })
        .catch(onerror);
    }else{
      console.log("invalid data");
    }
  }

}
