import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Song } from './song.models';
import { AuthService } from "../authentication/auth.service";
import { environment } from '../../environments/environment';

@Injectable()
export class SongService {  
    private baseUrl = environment.apiUrl + 'api/songs';
    // private baseUrl = 'api/songs';
    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http,
                private _auth: AuthService) {
      let bearer = this._auth.currentUser.access_token;
      this.headers = new Headers({ 'Content-Type': 'application/json','Authorization': `Bearer ${bearer}` });
      this.options = new RequestOptions({ headers: headers });     
    }

    private extractData(response: Response) {        
        let body = response.json();
        return body || {};
    }

    getSongs() : Observable<Song[]> {   
        return this._http.get(this.baseUrl, this.options)
            //.do((response: Response) => console.log(response))
            .map(this.extractData)
            .catch(this._handleError);
    }

    getSongById(id:number) : Observable<Song> {
         if (id === 0) { return Observable.of(this.initializeSong()); }
        const url = `${this.baseUrl}/${id}`;
        return this._http.get(url, this.options)
            //.do((response: Response) => console.log(response))
            .map(this.extractData)
            .catch(this._handleError);
    }

    deleteSong(id: number): Observable<Response> {
        
        const url = `${this.baseUrl}/${id}`;
        return this._http.delete(url)
            .do(data => console.log('deleteSong: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    saveProduct(song: Song): Observable<Song> {        
        if (song.id === 0) {
            return this.createSong(song);
        }
        return this.updateSong(song);
    }

    private createSong(song: Song): Observable<Song> {
        song.id = undefined;
        return this._http.post(this.baseUrl, song, this.options)
            .map(this.extractData)
            .do(data => console.log('createSong: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    private updateSong(song: Song): Observable<Song> {
        const url = `${this.baseUrl}/${song.id}`;
        return this._http.put(url, song, this.options)
            .map(() => song)
            .do(data => console.log('updateSong: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    initializeSong(): Song {
        // Return an initialized object
        return new Song(0, null, null, null, 0);
    }

}
