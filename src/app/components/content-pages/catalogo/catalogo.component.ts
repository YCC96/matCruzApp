import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
declare var $:any;
//import { environment } from 'src/environments/environment';
//import * as catalogos from '../../../../assets/json/catalogos.json';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {


  tipo: string = '';
  title: string = '';

  dataTable = [];

  constructor( private _activeRoute:ActivatedRoute,
    private _router: Router, private _router1: ActivatedRoute, private _router2: Location
    ) { }

  ngOnInit() {
    this.getFile();
    console.log('*_* ini: ', this.getUiid())
  }

  getFile() {
    this.dataTable = [];
    fetch('assets/docs/catalogo.csv')
    .then(res => res.text())
    .then(content => {
      var json = this.csvJSON(content);
      this._activeRoute.params.subscribe( params => {
        this.tipo = params['tipo']
        console.log('*_*: ', json);
        if (this.tipo == 'construccion') this.title = 'Construcción';
        if (this.tipo == 'plomeria') this.title = 'Plomería';
        if (this.tipo == 'gas') this.title = 'Gas';
        if (this.tipo == 'electrico') this.title = 'Eléctrico';
        if (this.tipo == 'hogar') this.title = 'Hogar';

        for (const ll of json) {
          if(ll.catalogo == this.tipo) {
            this.dataTable.push(ll)
          }
        }
        console.log('*_* dataTable: ', this.dataTable);
      });
    });
  }

  csvJSON(csv: string){
    var lines = csv.split("\n");
    var result = [];
    //var headers = lines[0].split(",");
    var headers = ['catalogo', 'id', 'producto', 'descripcion', 'pesoMedida', 'imagen'];
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

  alert(list) {
    console.log('*_* list: ', list);
    Swal.fire({
      title: list.producto,
      text: list.pesoMedida,
      imageUrl: 'assets/image/' + list.imagen,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: list.producto,
    })
  }

  regresar() {
    this._router2.back();
  }

  hacerPedido() {
    this._router.navigate(['/pagina', 'compras-por-telefono']);
  }

  getUiid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }

}
