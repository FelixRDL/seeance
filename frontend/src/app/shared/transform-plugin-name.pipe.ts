// Taken from https://medium.com/@AAlakkad/angular-2-display-html-without-sanitizing-filtering-17499024b079
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'transformPlugin', pure: false })
export class TransformPluginNamePipe implements PipeTransform {

  constructor() { }

  transform(input: string) {
    return input
      .split('-')
      .map(this.capitalize)
      .reduce((acc, curr: string) => !acc ? acc = curr : `${acc} ${curr}`, undefined);
  }

  private capitalize(input: string): string {
    // https://www.geeksforgeeks.org/how-to-make-first-letter-of-a-string-uppercase-in-javascript/
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
