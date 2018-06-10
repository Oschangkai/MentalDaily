import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicModule } from './public/public.module';

const routes: Routes = [
  { path: '', loadChildren: () => PublicModule },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
