import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from "rxjs/Rx";

@Injectable()
export class DataService {
    
    constructor(private _http: Http) { }

    private extractData(response: Response) {        
        let body = response.json();
        return body.data || {};
    }    

    private _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    public getMessages(): Observable<any> {
        return this._http.get('assets/messages')
            .do(res => console.log(res))
            .map(this.extractData)
            .catch(this._handleError);
    }

}