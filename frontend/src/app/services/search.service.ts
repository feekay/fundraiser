import { Injectable } from '@angular/core';
import { baseUrl } from "app/constants";
import { Http } from "@angular/http";
import { Helper } from "app/services/helper";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SearchService {

  private searchUrl = baseUrl +'/find'
  constructor(private http:Http) { }

  query():Observable<any>{
    return this.http.get(this.searchUrl)
    .map(Helper.extractArray)
    .catch(Helper.handleError);
  }

}
