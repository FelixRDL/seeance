// Taken from https://medium.com/@AAlakkad/angular-2-display-html-without-sanitizing-filtering-17499024b079
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'allowRaw', pure: false })
export class AllowRawPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
