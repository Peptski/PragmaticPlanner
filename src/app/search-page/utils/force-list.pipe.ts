import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'forcelist', standalone: true })
export class ForceListPipe implements PipeTransform {
  transform<T>(value: T | T[]) {
    if (Array.isArray(value)) return value;
    return [value];
  }
}
