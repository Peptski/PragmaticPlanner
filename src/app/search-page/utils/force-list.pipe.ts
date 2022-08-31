import { Pipe, PipeTransform } from '@angular/core';
import { Leg } from './leg.model';

@Pipe({ name: 'forcelist', standalone: true })
export class ForceListPipe implements PipeTransform {
  transform(value: Leg | Array<Leg>) {
    if (Array.isArray(value)) return value;
    return [value];
  }
}
