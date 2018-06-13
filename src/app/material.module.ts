import { NgModule } from '@angular/core';
import { 
  MatButtonModule, MatToolbarModule, 
  MatCardModule, MatInputModule,
  MatSnackBarModule
 } from '@angular/material';

const Mat = [
  MatButtonModule, MatToolbarModule,
  MatCardModule, MatInputModule,
  MatSnackBarModule
];

@NgModule({
  imports: Mat,
  exports: Mat
})
export class MaterialModule { }
