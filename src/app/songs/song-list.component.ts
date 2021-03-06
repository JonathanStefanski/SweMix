import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Song } from "./song.models";


@Component({
    moduleId: module.id,    
    templateUrl: 'song-list.component.html',
    styleUrls: ['song-list.component.css']
})
export class SongListComponent implements OnInit {
    sortFields = [{field: 'mixId', order: 1}];
    hideId: boolean = true;
    songs: Song[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() { 
        this._route.data.subscribe(
            data => this.songs = data['songs']
        )
    }

    getTotal(songs: Song[]):number {       
        return songs.map(s => s.length).reduce((a, b) => a + b);
    }

    navigateToDetailView(id: number):void {
        this._router.navigate(['/songs', id]);
    }

    toggleIds():void {        
        this.hideId = !this.hideId;
    }
}