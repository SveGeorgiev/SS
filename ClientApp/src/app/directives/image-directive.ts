import { Directive, Input } from "@angular/core";

@Directive({
  selector: 'app-img[default]'
})
export class ImageDirective {
  @Input() image: File;
  @Input() src: any;
}