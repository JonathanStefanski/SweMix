import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { SongListComponent } from './song-list.component';
import { SongDetailComponent } from './song-view.component';
import { SongEditComponent } from './song-edit.component';
import { SongService } from "./song.service";
import { SongListResolver, SongResolver } from "./song-resolver.service";
import { SongDetailGuard, SongEditGuard } from "./song-guard.service";

import { SharedModule } from "../shared/shared.module";

const ROUTES = [
    { 
        path: 'songs', 
        component: SongListComponent, 
        resolve: { songs: SongListResolver}
    },
    { 
        path: 'songs/:id', 
        component: SongDetailComponent, 
        resolve: { song: SongResolver},
        canActivate: [ SongDetailGuard ]
    },
    { 
        path: 'songs/:id/edit', 
        component: SongEditComponent, 
        resolve: { song: SongResolver},
        canDeactivate: [ SongEditGuard ]
    }
]

@NgModule({
    imports: [         
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        SongListComponent,
        SongDetailComponent,
        SongEditComponent
    ],
    providers: [
        SongService,
        SongResolver,
        SongListResolver,
        SongDetailGuard,
        SongEditGuard          
    ]
})
export class SongModule { }