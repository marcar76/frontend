import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datear'
})
export class DatearPipe implements PipeTransform {

  transform(value: string ): string {
    let result:string="";
    result= value.replace(",","-");
    return result;
  }

}
