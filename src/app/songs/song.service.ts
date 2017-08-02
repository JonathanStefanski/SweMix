import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Song } from './song.models';
import { AuthService } from "../authentication/auth.service";
import { environment } from '../../environments/environment';

import { WindowService } from "../shared/window.service";

@Injectable()
export class SongService {  
    private baseUrl = environment.apiUrl + 'api/songs';
    // private baseUrl = 'api/songs';
    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http,
                private _auth: AuthService,
                private _windowService: WindowService) {
       this.setOptions();
    }

    private setOptions() {
        let bearer = this._auth.currentUser == null ? '' : this._auth.currentUser.access_token;
        this.headers = new Headers({ 'Content-Type': 'application/json','Authorization': `Bearer ${bearer}` });
        this.options = new RequestOptions({ headers: this.headers });    
    }

     private extractData(response: Response) {    
        try {
            let body = response.json();
            return body || {};
        } catch (error) {
            return {}
        }    
        
    }    

    getSongs() : Observable<Song[]> {           
        return this._http.get(this.baseUrl)            
            .map(this.extractData)
            .catch(this._handleError);
    }

    getSongById(id:number) : Observable<Song> {
        if (id === 0) { return Observable.of(this.initializeSong()); }
        const url = `${this.baseUrl}/${id}`;
        return this._http.get(url)            
            .map(this.extractData)
            .catch(this._handleError);
    }

    deleteSong(id: number): Observable<Response> {
        this.setOptions();
        const url = `${this.baseUrl}/${id}`;
        return this._http.delete(url)            
            .catch(this._handleError);
    }

    saveSong(song: Song): Observable<Song> {        
        if (song.id === 0) {
            return this.createSong(song);
        }
        return this.updateSong(song);
    }

    private createSong(song: Song): Observable<Song> {
        this.setOptions();
        song.id = undefined;
        return this._http.post(this.baseUrl, song, this.options)
            .map(this.extractData)
            //.do(data => console.log('createSong: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    private updateSong(song: Song): Observable<Song> {
        this.setOptions();
        const url = `${this.baseUrl}/${song.id}`;
        return this._http.put(url, song, this.options)
            .map(() => song)
            //.do(data => console.log('updateSong: ' + JSON.stringify(data)))
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

    createPlayList(songs: Song[]) {
        let win = this._windowService.getNativeWindow();  
        let urls : String[] = [];

        Observable.forkJoin(songs.map(
            (song: Song) => {
                let url = `http://www.youtubeinmp3.com/fetch/?format=JSON&video=https://www.youtube.com/watch?v=${song.youtubeCode}&title=${song.id}`;
                return this._http.get(url).do(data => console.log(data)).map(this.extractData);
            }
        )).subscribe(
            data => {
                data.forEach((response) => {
                    if (response.link != undefined) {
                        win.open(response.link);                        
                    }
                    
                })
            }
        )        
        // x.map((songs: Song) => {
        //         let url = `http://www.youtubeinmp3.com/fetch/?format=JSON&video=https://www.youtube.com/watch?v=${song.youtubeCode}&title=${song.id}`;
               
        //     })
        //     .catch(this._handleError);

        // await Promise.all(songs.map(async (song) => {
        //     let url = `http://www.youtubeinmp3.com/fetch/?format=JSON&video=https://www.youtube.com/watch?v=${song.youtubeCode}&title=${song.id}`;
        //     this._http.get(url).map(this.extractData).subscribe(response => {urls.push(response.link); console.log(urls)}, err => console.log(err));
        // }));

        

        // console.log(songs);
        // let x = this._windowService.getNativeWindow();        
        // x.open('http://www.google.be', "_BLANK");
    }    

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
