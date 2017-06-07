import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SafePipe, TimePipe, EmbedPipe } from './shared.pipes';
import { NumericValidators } from "./numeric.validator";

import { DataService } from "./data.service"

@NgModule({  
  imports: [ CommonModule ],
  declarations: [ 
    TimePipe, 
    SafePipe, 
    EmbedPipe 
  ],
  exports: [ 
    CommonModule,
    FormsModule,
    TimePipe, 
    SafePipe, 
    EmbedPipe 
  ],
  providers: [
    DataService
  ]
})
export class AppSharedModule { }