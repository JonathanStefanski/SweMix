import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import { Video } from "./song.models";


@Injectable()
export class YoutubeService {
    private baseUrl: string = "https://www.googleapis.com/youtube/v3";
    private apiKey: string = "AIzaSyAcMidn6I4kBlXv9EzAUNYLElDBGTNotik";

    constructor(private _http: Http) { }

    private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }

    _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }


    search(query: string): Observable<Video[]> {
        if (query == null || query === "") return Observable.of([]);
        return this._http.get(`${this.baseUrl}/search?q=${query}&part=snippet&key=${this.apiKey}`)
            .map(this.extractData)
            .map(json => json.items)
            .map(items => items.map(item =>
                new Video(
                    item.id.videoId,
                    item.snippet.title,
                    item.snippet.description,
                    item.snippet.thumbnails.default.url)))
            .flatMap((videos: Video[]) => {
                if (videos.length > 0) {
                    let test = videos.map(v => v.videoId).join(",");
                    return this._http.get(`${this.baseUrl}/videos?id=${test}&part=contentDetails&key=${this.apiKey}`)
                        .map(this.extractData)
                        .map(json => json.items)
                        .map(items => items.map(item => {
                            let video = videos.find(v => v.videoId == item.id);
                            video.duration = item.contentDetails.duration;
                            return video;
                        }));
                }
                return Observable.of([]);
            })
            .catch(this._handleError);
    }
}