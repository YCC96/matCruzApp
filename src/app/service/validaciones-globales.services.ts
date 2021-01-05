import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacioneGlobalesService {

    csvToJson(csv: string, headers:Array<any>){
        var lines = csv.split("\n");
        var result = [];
        //var headers = ['catalogo', 'id', 'producto', 'descripcion', 'pesoMedida', 'imagen'];
        console.log('*_* headers: ', headers);
        for(var i = 1; i < lines.length; i++){
            var obj = {};
            var currentline = lines[i].split(",");
            for(var j = 0; j < headers.length; j++){
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }  
        return JSON.parse(JSON.stringify(result));
    }

    getUiid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
          return v.toString(16);
        });
      }
}
