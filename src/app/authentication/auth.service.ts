import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable, Subject } from "rxjs/Rx";

import { User } from "./auth.model";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    private baseUrl = environment.apiUrl + 'Token';
    currentUser: User;
    redirectUrl: string;   

    constructor(private _http: Http) { 
        this.currentUser = JSON.parse(localStorage.getItem('_currentUser'));  
    }

    private extractData(response: Response) {        
        let body = response.json();
        return body || {};
    }    

    private _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    login(userName: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        let data = new URLSearchParams();
        data.append('username', userName);
        data.append('password', password);
        data.append('grant_type', 'password');
        
        return this._http.post(this.baseUrl, data, options)        
        .map((response: Response) => {
            let userInfo = this.extractData(response);                        
            if (userInfo) {
                this.currentUser = userInfo;          
                this.currentUser.roles = JSON.parse(userInfo["roles"]);                
                localStorage.setItem('_currentUser', JSON.stringify(this.currentUser));
                //console.log(this.currentUser);
                return true;
            } else {
                return false;
            }
        })
        .catch(this._handleError);
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('_currentUser');
    }

}