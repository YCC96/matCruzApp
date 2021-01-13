import { Component, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';
import { Router } from '@angular/router';
import { ValidacioneGlobalesService } from '../../../service/validaciones-globales.services';
import { CatalogosInterface } from '../../../models/catalogos.interface';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

  dataTable = [];
  tipo: string = '';
  listCatalogos: CatalogosInterface = {
    listCatalogos: [],
    listMarcas: []
  };
  flags: boolean = false;
  ls = new SecureLS({encodingType: 'aes'});

  constructor(
    private _router:Router,
    private _valid: ValidacioneGlobalesService,
    ) { }

  ngOnInit() {
    this.getFile();
  }

  detalleCatalogo(area:string, marca: string){
    this._router.navigate(['/pagina','productos', area, marca]);
  }

  getFile() {
    this.dataTable = [];
    fetch('assets/docs/catalogos.csv')
    .then(res => res.text())
    .then(content => {
      let listHeaders = ['catalogo','etiqueta','descripcion','imagen'];
      var dataJson = this._valid.csvToJson(content, listHeaders);
      this.agruparData(dataJson);
    });
  }

  agruparData(dataJson){
    var banMarca: boolean = false;
    for(const ll of dataJson){
      if (ll.catalogo != '') {
        if (ll.catalogo.toLowerCase() == 'marca') {
          banMarca = true;
        }
        if (!banMarca) {
          this.listCatalogos.listCatalogos.push(ll);
        } else {
          if (ll.catalogo.toLowerCase() != 'marca') {
            this.listCatalogos.listMarcas.push(ll);
          }
        }
      }
    }
    this.flags = true;
    this.ls.set('listCatalogos', this.listCatalogos);
  }

}
