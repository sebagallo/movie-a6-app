import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {filter, tap} from 'rxjs/operators';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(items: Observable<any[]>, callback: (item: any) => boolean): Observable<any[]> {
    if (!items || !callback) {
      return items;
    }
    return items.pipe(
      filter(item => callback(item))
    );
  }

}
