import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { User } from '../models/user';
import { Helper } from '../services/helper';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from "app/services/auth.service";

@Injectable()
export class UserService {

    private userUrl = baseUrl + "/api/profile";
    private options;
    private updateOptions;
    constructor(private http: Http, authService:AuthService) { 
        this.options = authService.getHeaders();
        this.updateOptions = authService.getUploadHeaders();
    }

    getMyProfile(): Observable<any> {
        return this.http.get(this.userUrl+'/me',this.options)
            .map(Helper.extractData)
            .catch(Helper.handleError);
    }

    updateMyProfile(data) {
        return this.http.put(this.userUrl+'/me',data,this.updateOptions)
            .toPromise();
    }

}