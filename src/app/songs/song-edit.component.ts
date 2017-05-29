import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
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
    constructor(private _route: ActivatedRoute,
                private _fb: FormBuilder) { }

    ngOnInit() {       
        this._route.data.subscribe(
            data => {
                this.song = data['song'];

                this.songForm = this._fb.group({
                    id: {value: this.song.id, disabled: true},
                    title: this.song.title,
                    artist: this.song.artist,
                    url: this.song.url,
                    length: this.song.length,
                    downloaded: this.song.downloaded,
                    fileLocation: this.song.fileLocation
                });
            }
        );
        
    }

    save() {
        console.log("Saving form...");
        console.log(this.songForm.value);
    }

}