import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Song } from "./song.models";


@Component({
    moduleId: module.id,
    templateUrl: 'song-edit.component.html',
    styleUrls: ['song-edit.component.css']
})
export class SongEditComponent implements OnInit {
    songForm : FormGroup;
    song : Song;
    constructor(private _route: ActivatedRoute) { }

    ngOnInit() { 
        this._route.data.subscribe(
            data => {
                this.song = data['song'];
            }
        );
        this.songForm = new FormGroup({

        });
    }

}