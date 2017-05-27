import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component, PageErrorComponent } from './page-404.component';

const ROUTES = [
    { path: 'home', component: HomeComponent },
    { path: 'error', component: PageErrorComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },    
    { path: '**', component: Page404Component }
]

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }