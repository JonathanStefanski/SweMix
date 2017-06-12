import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { YoutubeService } from "./youtube.service";

import { Observable } from "rxjs/Rx";
import { Video } from "./song.models";

@Component({
    moduleId: module.id,
    selector: 'song-search',
    templateUrl: 'song-search.component.html',
    styleUrls: ['song-search.component.css'],

})
export class SongSearchComponent implements OnInit, OnChanges {
    @Input() songForm: FormGroup;
    @Output() videoClick = new EventEmitter<Video>();
    searchForm: FormGroup;
    videos: Video[];

    constructor(private _fb: FormBuilder,
                private _service: YoutubeService) { }

    ngOnInit() { 
        if (this.searchForm) {
            this.searchForm.reset();
        }

        this.searchForm = this._fb.group({
            query: this.songForm.value.youtubeCode
        });

        this.searchForm.get('query').valueChanges
            .debounceTime(800)
            .distinctUntilChanged()            
            .switchMap(query => this._service.search(query))
            .subscribe(
                data => {           
                    console.log(data);
                    this.videos = data;
                }
            );        
    } 

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {              
        for (let propName in changes) {  
            if (propName == "songForm") {
                let changedProp = changes[propName];
                this.songForm = changedProp.currentValue
            };
        }
    }


    onmouseclick(video: Video) {
        this.videoClick.emit(video);
    }

}