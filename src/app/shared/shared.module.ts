import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { SafePipe, TimePipe, EmbedPipe }         from './shared.pipes';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ TimePipe, SafePipe, EmbedPipe ],
  exports:      [ TimePipe, SafePipe, EmbedPipe, CommonModule, FormsModule ]
})
export class SharedModule { }