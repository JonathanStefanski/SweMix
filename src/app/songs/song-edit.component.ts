import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Song } from "./song.models";
import { NumericValidators } from "../shared/numeric.validator";


@Component({
    moduleId: module.id,
    templateUrl: 'song-edit.component.html',
    styleUrls: ['song-edit.component.css']
})
export class SongEditComponent implements OnInit {
    songForm : FormGroup;
    song : Song;
    validationMessage: string;
    
    constructor(private _route: ActivatedRoute,
                private _fb: FormBuilder) { }

    ngOnInit() {       
        
        this._route.data.subscribe(data => { this.song = data['song']; });    

        this.songForm = this._fb.group({
                    id: {value: this.song.id, disabled: true},
                    title: [this.song.title, [Validators.required, Validators.minLength(3)]],
                    artist: [this.song.artist, [Validators.required, Validators.minLength(3)]],
                    url: [this.song.url, [Validators.required, Validators.pattern("https://www.youtube.com/watch?.+")]],
                    length: [this.song.length, [Validators.required, NumericValidators.isBetween(60, 1200)]],
                    downloaded: this.song.downloaded,
                    fileLocation: this.song.fileLocation
        });

        this.songForm.get('downloaded').valueChanges.subscribe(
            value => {
                const fileLocationControl = this.songForm.get('fileLocation');
                if (value) fileLocationControl.setValidators([Validators.required]);
                else fileLocationControl.clearValidators();  
                fileLocationControl.updateValueAndValidity();
            }
        );

        
    }   

    save() {
        console.log("Saving form...");
        console.log(this.songForm.value);
    }

}