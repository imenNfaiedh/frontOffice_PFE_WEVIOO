import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAccountNumber',
  standalone: true
})
export class FormatAccountNumberPipe implements PipeTransform {
  transform(value: number | string | undefined): string {
    if (value === undefined || value === null) {
      return '';
    }
    return value
      .toString()
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

}
