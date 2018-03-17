import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'toArray'
})

export class ToArrayPipe implements PipeTransform {
  transform(value) {
    return (new Array(value)).fill('i');
  }
}
