import { Component, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';
import { Router } from '@angular/router';
import { ValidacioneGlobalesService } from '../../../service/validaciones-globales.services';
declare var $:any;

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

  dataTable = [];
  tipo: string = '';
  listCatalogos = [];
  flags: boolean = false;
  ls = new SecureLS({encodingType: 'aes'});

  constructor(
    private _router:Router,
    private _valid: ValidacioneGlobalesService,
    ) { }

  ngOnInit() {
    this.getFile();
  }

  detalleCatalogo(tipo:number){
    this._router.navigate(['/pagina','catalogo', tipo])
  }

  getFile() {
    this.dataTable = [];
    fetch('assets/docs/catalogos.csv')
    .then(res => res.text())
    .then(content => {
      let listHeaders = ['catalogo','etiqueta','descripcion','imagen'];
      //var json = this.csvJSON(content, listHeaders);
      this.listCatalogos = this._valid.csvToJson(content, listHeaders);
      this.flags = true;
      this.ls.set('listCatalogos', this.listCatalogos);

    });
  }

}
