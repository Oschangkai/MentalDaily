import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { MaterialModule } from '../material.module';
import { FirebaseModule } from '../firebase.module';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule
  ],
  declarations: [PublicComponent, LoginComponent, RegisterComponent]
})
export class PublicModule { }
