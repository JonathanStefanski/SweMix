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
        this.song = this._route.snapshot.data["song"];

        console.log(this.song.url);
    }

}