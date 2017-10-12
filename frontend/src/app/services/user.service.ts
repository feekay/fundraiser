import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { baseUrl } from '../constants';
import { User } from '../models/user';
import { Helper } from '../services/helper';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';


import { AuthService } from "app/services/auth.service";

@Injectable()
export class UserService {
    observable: any;
    user: any;

    private userUrl = baseUrl + "/api/profile";
    private options;
    private updateOptions;
    constructor(private http: Http, authService: AuthService) {
        this.options = authService.getHeaders();
        this.updateOptions = authService.getUploadHeaders();
    }


    getMyProfile():Observable<any>{
        if (this.user) {
            // if `data` is available just return it as `Observable`
            return Observable.of(this.user);
        } else if (this.observable) {
            // if `this.observable` is set then the request is in progress
            // return the `Observable` for the ongoing request
            return this.observable;
        } else {
            this.observable = this.http.get(this.userUrl + '/me', this.options)
                .map(response => {
                    // when the cached data is available we don't need the `Observable` reference anymore
                    this.observable = null;
                    this.user =Helper.extractData(response);
                    return this.user;
                })
                .share();
            return this.observable;
        }
    }

    updateMyProfile(data) {
        return this.http.put(this.userUrl + '/me', data, this.updateOptions)
            .toPromise();
    }

}