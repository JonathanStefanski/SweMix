import { NgModule }            from '@angular/core';
import { SafePipe, TimePipe, EmbedPipe } from './shared.pipes';
import { NumericValidators } from "./numeric.validator";

import { DataService } from "./data.service"

@NgModule({  
  declarations: [ 
    TimePipe, 
    SafePipe, 
    EmbedPipe 
  ],
  exports: [ 
    TimePipe, 
    SafePipe, 
    EmbedPipe 
  ],
  providers: [
    DataService
  ]
})
export class SharedModule { }