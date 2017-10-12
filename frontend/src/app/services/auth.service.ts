import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { baseUrl } from "app/constants";
@Injectable()
export class AuthService {
    private user: any;
    private id: string = "";

    private authUrl = baseUrl + "/auth/status";
    private loginUrl = baseUrl + "/auth/login";
    private signupUrl = baseUrl + "/auth/signup";
    private options = new RequestOptions({ headers: new Headers({ "Content-Type": "application/json" }) });
    private token = "";
    private permission = "";

    constructor(private http: Http) {
        this.token = localStorage.getItem('token') || null;
    }


    setId(id: string) {
        this.id = id;
        localStorage.setItem('id', id);
    }

    getId() {
        return this.id || localStorage.getItem('id');
    }


    setToken(t: string) {
        this.token = t;
        localStorage.setItem('token', t);
    }

    signup(name: string, email: string, password: string): Promise<any> {
        return this.http.post(this.signupUrl, { name: name, email: email, password: password }, this.options)
            .toPromise();
    }

    login(username: string, password: string): Promise<any> {
        return this.http.post(this.loginUrl, { username: username, password: password }, this.options)
            .toPromise();
    }

    facebookAuth(): Promise<any> {
        return null;
    }

    googleAuth(): Promise<any> {
        return null;
    }

    logout() {
        this.setId("");
        this.setToken("");
    }

    isAuthenticated() {
        return this.http.get(this.authUrl, this.getHeaders()).toPromise();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getHeaders() {
        return new RequestOptions({ headers: new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + this.token }) });
    }
    getUploadHeaders() {
        return new RequestOptions({ headers: new Headers({ "Accept": "application/json", "Authorization": "Bearer " + this.token }) });
    }
}