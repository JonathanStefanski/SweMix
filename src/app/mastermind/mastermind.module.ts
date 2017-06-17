import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { MasterMindComponent } from './mastermind.component';

import { AppSharedModule } from "../shared/shared.module";
import { DragDropModule } from 'primeng/primeng';

const ROUTES = [
    { 
        path: '', 
        component: MasterMindComponent
    }
]

@NgModule({
    imports: [      
        AppSharedModule,   
        DragDropModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        MasterMindComponent
    ],
    providers: [         
    ]
})
export class MasterMindModule { }