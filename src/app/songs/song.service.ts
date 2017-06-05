import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
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
        if (id === 0) { return Observable.of(this.initializeSong()); }
        const url = `${this.baseUrl}/${id}`;
        return this._http.get(url)
            //.do((response: Response) => console.log(response))
            .map(this.extractData)
            .catch(this._handleError);
    }

    deleteSong(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this._http.delete(url, options)
            .do(data => console.log('deleteSong: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    saveProduct(song: Song): Observable<Song> {        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (song.id === 0) {
            return this.createSong(song, options);
        }
        return this.updateSong(song, options);
    }

    private createSong(song: Song, options: RequestOptions): Observable<Song> {
        song.id = undefined;
        return this._http.post(this.baseUrl, song, options)
            .map(this.extractData)
            .do(data => console.log('createSong: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    private updateSong(song: Song, options: RequestOptions): Observable<Song> {
        const url = `${this.baseUrl}/${song.id}`;
        return this._http.put(url, song, options)
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