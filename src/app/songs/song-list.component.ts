import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Song } from "./song.models";
import { SongService } from "./song.service";


@Component({
    moduleId: module.id,    
    templateUrl: 'song-list.component.html',
    styleUrls: ['song-list.component.css']
})
export class SongListComponent implements OnInit {
    songs: Song[];
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _songService: SongService
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

    generatePlaylist():void {
        this._songService.createPlayList(this.songs);
    }

}