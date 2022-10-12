import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'errortext', standalone: true })
export class ErrorTextPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (value === null) return null;

    if (value === '401') {
      return '401: Authorization failed, fetching new token...';
    }

    return value + ': Error occured when fetching from API';
  }
}
