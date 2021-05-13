import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { FileInterface } from '../interface/file-interface';

@Directive({
  selector: '[appDragNDropWrapper]',
})
export class DragNDropDirective {
  lowerElement: HTMLTextAreaElement;
  @Input('appDragNDropWrapper') canUpload: boolean;
  @Output() getFile: EventEmitter<FileInterface> =
    new EventEmitter<FileInterface>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.canUpload) {
      this.lowerElement = event.target as HTMLTextAreaElement;
      this.renderer.addClass(this.elementRef.nativeElement, 'available');
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent): void {
    event.preventDefault();
    if (this.canUpload) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'available');
    }
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.canUpload) {
      if (this.lowerElement.children.length === 0) {
        this.renderer.removeClass(this.elementRef.nativeElement, 'available');
        const dropedFile = this.renderer.createElement('img');
        const file: any = event.dataTransfer.files[0];
        const url: string = URL.createObjectURL(file);
        const date: string = String(Date.now());
        this.renderer.appendChild(event.target, dropedFile);
        this.renderer.setAttribute(dropedFile, 'src', url);
        this.renderer.setAttribute(dropedFile, 'alt', file.name);
        this.renderer.setAttribute(dropedFile, 'id', date);
        this.renderer.setAttribute(dropedFile, 'draggable', 'false');
        this.getFile.emit({ file, url, date });
      }
    }
  }
}
