// magnifier.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMagnifier]'
})
export class MagnifierDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const previewImage = this.el.nativeElement.querySelector('.preview-image');
    const previewPopup = this.el.nativeElement.querySelector('.preview-popup');
    const magnifiedImage = this.el.nativeElement.querySelector('.magnified-image');

    const rect = previewImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this.renderer.setStyle(magnifiedImage, 'transform', `translate(-${xPercent}%, -${yPercent}%)`);
    this.renderer.setStyle(previewPopup, 'display', 'block');
    this.renderer.setStyle(previewPopup, 'right', `${x - 50}px`);
    this.renderer.setStyle(previewPopup, 'top', `${y - 100}px`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    const previewPopup = this.el.nativeElement.querySelector('.preview-popup');
    this.renderer.setStyle(previewPopup, 'display', 'none');
  }
}
