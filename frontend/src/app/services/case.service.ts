import { Injectable } from '@angular/core';
import { baseUrl } from "app/constants";
import { AuthService } from "app/services/auth.service";
import { Observable } from "rxjs/Observable";
import { Location } from "@angular/common";
import { Helper } from "app/services/helper";
import { Http } from "@angular/http";
import { ActivatedRouteSnapshot } from "@angular/router";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CaseService {

  private apipath="/api/";
  private caseUrl = baseUrl + this.apipath;
  private commentUrl = baseUrl+this.apipath+'case/comment'
  private options;
  private postOptions;
  constructor(private http: Http, authService: AuthService, location: Location) {
    if (location.path().includes('/blood')) {
      this.caseUrl += 'blood';
    }
    else if (location.path().includes('cash')) {
      this.caseUrl += 'cash';
    } else if (location.path().includes('volunteer')) {
      this.caseUrl += 'volunteer';
    }
    this.postOptions = authService.getUploadHeaders(); 
    this.options = authService.getHeaders();
  }

  registerCase(Case: any): Promise<any> {
    return this.http.post(this.caseUrl, Case, this.postOptions)
      .toPromise();
  }

  getCases(): Observable<any> {
    return this.http.get(this.caseUrl).map(Helper.extractArray)
      .catch(Helper.handleError);
  }

  getCase(id: string) {
    return this.http.get(this.caseUrl + '/' + id)
      .map(Helper.extractData)
      .catch(Helper.handleError);
  }

  changeRoute(path:string){
    this.caseUrl= baseUrl+this.apipath+path;
  }

  updateCase(id: string, Case: any): Promise<any> {
    return this.http.put(this.caseUrl + '/' + id, Case, this.postOptions)
      .toPromise();
  }

  subscribe(): Promise<any> {
    return this.http.post(this.caseUrl + '/subscribe', null, this.options)
      .toPromise();
  }
  postComment(id:number,text:string):Promise<any>{
    return this.http.post(this.commentUrl,{caseId:id,text:text},this.postOptions)
    .toPromise();
  }
}