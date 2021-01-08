import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacioneGlobalesService {

  csvToJson(csv: string, headers: Array<any>) {
    var lines = csv.split("\n");
    var result = [];
    //var headers = ['catalogo', 'id', 'producto', 'descripcion', 'pesoMedida', 'imagen'];
    console.log('*_* headers: ', headers);
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return JSON.parse(JSON.stringify(result));
  }

  numberFormat(numero, decimales, separadorDecimal, separadorMiles) {
    console.log('*_* global service: ', numero);
    var banNeg: boolean = false;
    banNeg = (String(numero).search('-') > -1 ? true : false);
    numero = numero + '';
    var cantidadFormat = numero.replace('$ ', '').replace('.00', '').replace(/[^0-9.]/g, '');
    var re = /,/g;
    cantidadFormat = cantidadFormat.replace(re, '');
    numero = cantidadFormat;

    var partes, array;
    if (!isFinite(numero) || isNaN(numero = parseFloat(numero))) {
      return "";
    }
    if (typeof separadorDecimal === "undefined") {
      separadorDecimal = ".";
    }
    if (typeof separadorMiles === "undefined") {
      separadorMiles = ",";
    }
    // Redondeamos
    if (!isNaN(parseInt(decimales))) {
      if (decimales >= 0) {
        numero = numero.toFixed(decimales);
      } else {
        numero = (
          Math.round(numero / Math.pow(10, Math.abs(decimales))) * Math.pow(10, Math.abs(decimales))
        ).toFixed();
      }
    } else {
      numero = numero.toString();
    }
    // Damos formato
    partes = numero.split(".", 2);
    array = partes[0].split("");
    for (var i = array.length - 3; i > 0 && array[i - 1] !== "-"; i -= 3) {
      array.splice(i, 0, separadorMiles);
    }
    numero = array.join("");

    if (partes.length > 1) {
      numero += separadorDecimal + partes[1];
    }

    return '$ ' + (banNeg ? '-' : '') + numero;
  }

  getUiid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
}
