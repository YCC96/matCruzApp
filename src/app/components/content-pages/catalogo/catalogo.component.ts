import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as catalogos from '../../../../assets/json/catalogos.json';
declare var $: any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  title: string;
  catalogos: any;
  modal:any = {
    title: '',
    img: ''
  }

  constructor(private _router: Router, private _router1: ActivatedRoute, private _router2: Location) { }

  ngOnInit() {
    this.getCatalogoUrl();
  }

  getCatalogoUrl() {
    var tipo = this._router1.snapshot.paramMap.get("tipo");
    console.log('*_* catalogo #: ', tipo);

    switch (tipo) {
      case '1':
        this.title = 'Catálogo de materiales para construcción';
        this.catalogos = catalogos.catalogos.construccion;

        break;

      case '2':
        this.catalogos = catalogos.catalogos.plomeria;

        break;

      case '3':
        this.catalogos = catalogos.catalogos.electrico;

        break;

      case '4':
        this.catalogos = catalogos.catalogos.hogar;

        break;

      case '5':
        this.catalogos = catalogos.catalogos.gas;

        break;

      case '6':

        break;

      default:
        break;
    }
    console.log('*_* catalogo selecionado: ', this.catalogos);
  }

  abrirImagen(i) {
    this.modal.title = this.catalogos[i].descripcion;
    this.modal.img = this.catalogos[i].imagen;
    $('#modal1').modal('show')
  }

  regresar() {
    this._router2.back();
  }

  hacerPedido() {
    this._router.navigate(['/pagina', 'comprasTelefono']);
  }

}
