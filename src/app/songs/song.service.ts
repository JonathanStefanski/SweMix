import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Song } from './song.models';


@Injectable()
export class SongService {   
    private baseUrl = 'api/songs';

    constructor(private _http: Http) { }

    private extractData(response: Response) {        
        let body = response.json();
        return body.data || {};
    }

    getSongs() : Observable<Song[]> {
        return this._http.get(this.baseUrl)
            //.do((response: Response) => console.log(response))
            .map(this.extractData)
            .catch(this._handleError);
    }

    getSongById(id:number) : Observable<Song> {
        const url = `${this.baseUrl}/${id}`;
        return this._http.get(url)
            //.do((response: Response) => console.log(response))
            .map(this.extractData)
            .catch(this._handleError);
    }

    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

}