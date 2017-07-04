import { Injectable } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Observable, Subject, ReplaySubject } from "rxjs/Rx";
import { environment } from "environments/environment";

import { AuthService } from "../authentication/auth.service";
import { Message } from "app/messages/messages.models";

@Injectable()
export class MessagesService {
    headers: Headers;
    options: RequestOptions;

    private messageSubject: Subject<Message[]>;
    private messageRequest: Observable<Message[]>;

    private baseUrl = environment.apiUrl + 'api/message';

    isDisplayed:boolean = false;

    constructor(private router: Router,
                private _auth: AuthService,
                private _http: Http){

        router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                if (e.url.indexOf('(popup') > -1){ this.isDisplayed = true}
            }
        });   

        this.messageSubject = new ReplaySubject(1);
    }

    private extractData(response: Response) {    
        try {
            let body = response.json();
            return body || {};
        } catch (error) {
            return {}
        }            
    }   

    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    getAll(refresh: boolean = false): Observable<Message[]>  {
        let bearer = this._auth.currentUser == null ? "" : this._auth.currentUser.access_token;
        let headers = new Headers({ 'Content-Type': 'application/json','Authorization': `Bearer ${bearer}` });
        let options = new RequestOptions({ headers: headers });

        if (refresh || !this.messageRequest) {
            this.messageRequest = this._http.get(this.baseUrl, options)
                .map(this.extractData)
                .catch(this._handleError);

            this.messageRequest.subscribe(
                result => this.messageSubject.next(result),
                err => this.messageSubject.error(err)
            );
        }

        return this.messageSubject.asObservable();
    }

    addMessage(message: Message): Observable<Message> {
        let bearer = this._auth.currentUser == null ? "" : this._auth.currentUser.access_token;
        let headers = new Headers({ 'Content-Type': 'application/json','Authorization': `Bearer ${bearer}` });
        let options = new RequestOptions({ headers: headers });
        let currentDate = new Date();
        message.timeStamp = currentDate;
        message.messageType = 1;
        
        return this._http.post(this.baseUrl, message, options)
            .map(this.extractData)
            .catch(this._handleError)
            .do(
                res => {                    
                    this.getAll().take(1).subscribe(messages => {
                        messages.unshift(res);
                        this.messageSubject.next(messages);
                    });
                }                
            );        

    }
}