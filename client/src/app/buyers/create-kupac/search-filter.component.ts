import { Pipe, PipeTransform } from '@angular/core';
import { IKupac } from 'src/app/_models/kupac';



@Pipe({ name: 'appFilter' })

export class SearchFilter1 implements PipeTransform {

  transform(items: IKupac[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.naziv.toLocaleLowerCase().includes(searchText);
    });
  }

}
