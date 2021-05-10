import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Book[], filterText: string): Book[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((b:Book)=>b.bookName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
