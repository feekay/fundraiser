import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CaseService } from "app/services/case.service";

@Injectable()
export class StudentsResolver implements Resolve<any> {

  constructor(private service: CaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getCases();
  }

}
