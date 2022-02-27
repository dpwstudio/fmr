import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[appProgressiveImage]',
})
export class ProgressiveImageDirective {
  @HostBinding('attr.src')
  @Input() src: string;
  
  @HostBinding('style.width.px')
  width: number;

  @HostBinding('style.height.px')
  height: number;
}

@Directive({
  selector: '[appProgressiveImageFallback]',
})
export class ProgressiveImageFallbackDirective {
  @HostBinding('style.width.px')
  width: number;

  @HostBinding('style.height.px')
  height: number;
}

@Directive({
  selector: '[appProgressiveImagePlaceholder]',
})
export class ProgressiveImagePlaceholderDirective {
  @HostBinding('style.width.px') 
  width: number;
 
  @HostBinding('style.height.px')
  height: number;
}