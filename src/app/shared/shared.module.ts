import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SafePipe, TimePipe, EmbedPipe, FilterPipe } from './shared.pipes';
import { NumericValidators } from "./numeric.validator";

import { DataService } from "./data.service"

@NgModule({  
  imports: [ CommonModule ],
  declarations: [ 
    TimePipe, 
    SafePipe, 
    EmbedPipe,
    FilterPipe
  ],
  exports: [ 
    CommonModule,
    FormsModule,
    TimePipe, 
    SafePipe, 
    EmbedPipe,
    FilterPipe 
  ],
  providers: [
    DataService
  ]
})
export class AppSharedModule { }