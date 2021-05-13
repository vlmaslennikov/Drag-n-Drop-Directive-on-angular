import { Component } from '@angular/core';
import { FileInterface } from './interface/file-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggle: boolean;
  filesStorage: FileInterface[] = [];

  insertFile(file: FileInterface): void {
    this.filesStorage.push(file);
    console.log('this.filesStorage', this.filesStorage);
  }
}
