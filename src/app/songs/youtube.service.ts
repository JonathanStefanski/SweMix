import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Video } from "./song.models";


@Injectable()
export class YoutubeService {
    private baseUrl : string = "https://www.googleapis.com/youtube/v3";
    private apiKey : string = "AIzaSyAcMidn6I4kBlXv9EzAUNYLElDBGTNotik";

    constructor(private _http: Http) { }

    private extractData(response: Response) {        
        let body = response.json();
        return body || {};
    }

    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    search(query: string): any {
        console.log(`${this.baseUrl}/search?q=${query}&part=snippet&key=${this.apiKey}`);
        return this._http.get(`${this.baseUrl}/search?q=${query}&part=snippet&key=${this.apiKey}`)
            .do((res) => console.log(res.json()))
            .map((res:Response) => res.json())
            .map(json => json.items);
    }

}