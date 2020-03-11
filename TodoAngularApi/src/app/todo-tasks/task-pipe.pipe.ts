import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'taskPipe'})
export class TaskPipePipe implements PipeTransform {

  transform(value: any[], term?: string): any[] {
    console.log(term);
  if(term==''||term=='mm/dd/yyyy')
  {
      return value;
  }
  return value.filter(function(item){
    return JSON.stringify(item).includes(term);
       });
  }
  
}
