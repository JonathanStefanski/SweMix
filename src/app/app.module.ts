import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";

import { AuthModule } from "./authentication/auth.module";

import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { MessagesModule } from "./messages/messages.module";
import { Page404Component, PageErrorComponent } from "./page-404.component";

import {DragDropModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,  
    Page404Component,
    PageErrorComponent
  ],
  imports: [    
    DragDropModule,
    BrowserModule,
    HttpModule,    
    AuthModule,    
    MessagesModule,
    AppRoutingModule    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
