import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './service/AuthGuard.service';

import { PublicModule } from './public/public.module';
import { NoteModule } from './note/note.module';

const routes: Routes = [
  { path: '', loadChildren: () => PublicModule },
  { path: 'note', loadChildren: () => NoteModule, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
