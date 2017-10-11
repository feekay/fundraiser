import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { BloodCaseService } from "app/services/blood-case.service";

@Injectable()
export class StudentsResolver implements Resolve<any> {

  constructor(private service: BloodCaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getCases();
  }

}
