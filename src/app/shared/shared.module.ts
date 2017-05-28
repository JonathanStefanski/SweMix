import { NgModule }            from '@angular/core';
import { SafePipe, TimePipe, EmbedPipe } from './shared.pipes';

@NgModule({
  imports:      [ ],
  declarations: [ TimePipe, SafePipe, EmbedPipe ],
  exports:      [ TimePipe, SafePipe, EmbedPipe ]
})
export class SharedModule { }