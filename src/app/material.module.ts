import { NgModule } from '@angular/core';
import { 
  MatButtonModule, MatToolbarModule, 
  MatCardModule, MatInputModule,
  MatSnackBarModule, MatIconModule,
  MatProgressSpinnerModule
 } from '@angular/material';

const Mat = [
  MatButtonModule, MatToolbarModule,
  MatCardModule, MatInputModule,
  MatSnackBarModule, MatIconModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: Mat,
  exports: Mat
})
export class MaterialModule { }
