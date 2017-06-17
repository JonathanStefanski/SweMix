import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component, PageErrorComponent } from './page-404.component';
import { AuthGuard } from "./authentication/auth-guard.service";

import { SelectiveStrategy } from "./shared/selective-strategy.service";

const ROUTES = [
    { path: 'home', component: HomeComponent },
    { path: 'mastermind', data: {preload: true}, loadChildren: './mastermind/mastermind.module#MasterMindModule'},
    { path: 'songs', canActivate: [ AuthGuard ], data: {preload: true}, loadChildren: './songs/song.module#SongModule'},
    { path: 'error', component: PageErrorComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },    
    { path: '**', component: Page404Component }
]

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy })
    ],
    providers: [ SelectiveStrategy ],
    exports: [RouterModule]
})
export class AppRoutingModule { }