import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DragNDropDirective } from './directives/drag-n-drop.directive';

@NgModule({
  declarations: [AppComponent, DragNDropDirective],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
