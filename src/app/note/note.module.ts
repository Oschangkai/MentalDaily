import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { MaterialModule } from '../material.module';

import { NoteComponent } from './note.component';


@NgModule({
  imports: [
    CommonModule,
    NoteRoutingModule,
    MaterialModule
  ],
  declarations: [NoteComponent]
})
export class NoteModule { }
