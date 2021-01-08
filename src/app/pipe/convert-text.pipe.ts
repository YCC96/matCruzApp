import { Pipe, PipeTransform } from '@angular/core';
import { ValidacioneGlobalesService } from '../service/validaciones-globales.services';

@Pipe({
  name: 'convertText'
})
export class ConvertTextPipe implements PipeTransform {

    constructor(private _valGloblas: ValidacioneGlobalesService){}

    transform(value: string, tipoDato:string): string {
      value = String(value);
        var respuesta: string = '';
        if (tipoDato=='moneda') {
          if (value == undefined || value == null || value == '' || value == '0'){
            respuesta = 'No disponible';
          } else {
            respuesta = this._valGloblas.numberFormat(value, 2, '.', ',');
          }
        }
        return respuesta;
    }

}
