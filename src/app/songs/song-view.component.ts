import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Song } from "./song.models";

@Component({
    moduleId: module.id,
    templateUrl: 'song-view.component.html',
    styleUrls: ['song-view.component.css']
})
export class SongDetailComponent implements OnInit {
    song: Song;
    constructor(private _route: ActivatedRoute) { }

    ngOnInit() { 
        this._route.data.subscribe(
            data => {
                let temp : Song = data['song'];
                this.song = new Song(temp.id, temp.title, temp.artist, temp.youtubeCode, temp.length);
            }
        );
    }

}