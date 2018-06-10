import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from '../material.module';
import { FirebaseModule } from '../firebase.module';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule
  ],
  declarations: [PublicComponent, LoginComponent]
})
export class PublicModule { }
