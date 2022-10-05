import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maxten', standalone: true })
export class MaxTenPipe implements PipeTransform {
  transform<T>(value: T) {
    if (Array.isArray(value)) {
      if (value.length > 10) {
        return value.slice(0, 10);
      }
      return value;
    }
    return [];
  }
}
