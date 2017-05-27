import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { SongService } from "./song.service";
import { Song } from "./song.models";

@Injectable()
export class SongListResolver implements Resolve<Song[]> {
    constructor(
        private _songService: SongService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song[]> {
        return this._songService.getSongs()
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/error']);
                return Observable.of(null);
            });
    }
}

@Injectable()
export class SongResolver implements Resolve<Song> {
    constructor(
        private _songService: SongService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Song id was not a number: ${id}`);
            this._router.navigate(['/songs']);
            return Observable.of(null);
        }

        return this._songService.getSongById(+id)
            .map(song => {
                if (song) {
                    return song;
                }
                console.log(`Song was not found: ${id}`);
                this._router.navigate(['/songs']);
                return null;
            })
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/songs']);
                return Observable.of(null);
            });
    }
}