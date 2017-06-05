import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { SongEditComponent } from './song-edit.component';

@Injectable()
export class SongDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid song id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/songs']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export class SongEditGuard implements CanDeactivate<SongEditComponent> {

    canDeactivate(component: SongEditComponent): boolean {
        if (component.songForm.dirty) {
            let songName = component.songForm.get('title').value || 'New song';
            return confirm(`Navigate away and lose all changes to ${songName}?`);
        }
        return true;
    }
}
