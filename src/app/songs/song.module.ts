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
import { WindowService } from "../shared/window.service";
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { AdminGuard } from "app/authentication/auth-guard.service";

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
        canActivate: [ AdminGuard ],
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
        WindowService,
        SongService,
        SongResolver,
        SongListResolver,
        SongDetailGuard,
        SongEditGuard,
        YoutubeService,
        AdminGuard          
    ]
})
export class SongModule { }