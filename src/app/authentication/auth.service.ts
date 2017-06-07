import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Rx";

import { User } from "./auth.model";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    private baseUrl = environment.apiUrl + 'Token';

    currentUser: User;
    redirectUrl: string;
    constructor(private _http: Http) { }

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
                return true;
            } else {
                return false;
            }
        })
        .catch(this._handleError);
    }

    logout(): void {
        this.currentUser = null;
    }

}