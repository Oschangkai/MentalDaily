import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [BrowserAnimationsModule, MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule],
  declarations: []
})
export class MaterialModule { }
