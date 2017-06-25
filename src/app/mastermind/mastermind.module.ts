import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { MasterMindComponent } from './mastermind.component';

import { AppSharedModule } from "../shared/shared.module";
import { DragDropModule } from 'primeng/primeng';
import { ColorService } from "./color.service";
import { ColorsResolver } from "./color-resolver.service";

const ROUTES = [
    { 
        path: '', 
        component: MasterMindComponent,
        resolve: { colors: ColorsResolver}
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
        ColorService,
        ColorsResolver
    ]
})
export class MasterMindModule { }