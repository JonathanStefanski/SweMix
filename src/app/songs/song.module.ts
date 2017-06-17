import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { SongListComponent } from './song-list.component';
import { SongDetailComponent } from './song-view.component';
import { SongEditComponent } from './song-edit.component';
import { SongSearchComponent } from "./song-search.component";
import { SongService } from "./song.service";
import { SongListResolver, SongResolver } from "./song-resolver.service";
import { SongDetailGuard, SongEditGuard } from "./song-guard.service";
import { YoutubeService } from "./youtube.service"

import { AppSharedModule } from "../shared/shared.module";
import { DataTableModule, SharedModule } from 'primeng/primeng';

const ROUTES = [
    { 
        path: '', 
        component: SongListComponent, 
        resolve: { songs: SongListResolver}
    },
    { 
        path: ':id', 
        component: SongDetailComponent, 
        resolve: { song: SongResolver},
        canActivate: [ SongDetailGuard ]
    },
    { 
        path: ':id/edit', 
        component: SongEditComponent, 
        resolve: { song: SongResolver},
        canDeactivate: [ SongEditGuard ]
    }
]

@NgModule({
    imports: [         
        AppSharedModule,
        DataTableModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        SongListComponent,
        SongDetailComponent,
        SongEditComponent,
        SongSearchComponent
    ],
    providers: [
        SongService,
        SongResolver,
        SongListResolver,
        SongDetailGuard,
        SongEditGuard,
        YoutubeService          
    ]
})
export class SongModule { }