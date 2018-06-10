import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';

const Mat = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule
];

@NgModule({
  imports: Mat,
  exports: Mat
})
export class MaterialModule { }
