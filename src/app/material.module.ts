import { NgModule } from '@angular/core';
import { 
  MatButtonModule, MatToolbarModule, 
  MatCardModule, MatInputModule,
  MatSnackBarModule, MatIconModule
 } from '@angular/material';

const Mat = [
  MatButtonModule, MatToolbarModule,
  MatCardModule, MatInputModule,
  MatSnackBarModule, MatIconModule
];

@NgModule({
  imports: Mat,
  exports: Mat
})
export class MaterialModule { }
