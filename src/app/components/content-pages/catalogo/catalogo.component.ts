import { Component, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
declare var $:any;
//import { environment } from 'src/environments/environment';
//import * as catalogos from '../../../../assets/json/catalogos.json';
import { MoveDataService } from '../../../service/move-data.service';
import { ValidacioneGlobalesService } from '../../../service/validaciones-globales.services';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  private moveDataSubs: Subscription;

  tipo: string = '';
  title: string = '';

  dataTable = [];
  dataTableOriginal = [];
  listCard:any = [];
  listValid = [];
  listCatalogos = [];
  busqueda: string = '';

  ls = new SecureLS({encodingType: 'aes'});

  banModal: boolean = false;

  constructor(
    private _activeRoute:ActivatedRoute,
    private _router: Router,
    private _router1: ActivatedRoute,
    private _router2: Location,
    private _moveData: MoveDataService,
    private _valid: ValidacioneGlobalesService
    ) { }

  ngOnInit() {
    this.listCatalogos = (this.ls.get('listCatalogos') != undefined && this.ls.get('listCatalogos') != null && this.ls.get('listCatalogos') != ''? this.ls.get('listCatalogos') : []);
    if (this.listCatalogos.length == 0) {
      this._router.navigate(['/pagina','catalogos']);
    } else {
      this.getFile();
      this.speakMoveData();
    }
  }

  speakMoveData(){
    this.moveDataSubs = this._moveData.moveData$.subscribe(result => {

      if (result && result == 'cleanAll') this.cleanCatalogos();
    });
  }

  getFile() {
    this.dataTableOriginal = [];
    fetch('assets/docs/catalogo.csv')
    .then(res => res.text())
    .then(content => {
      var headers = ['catalogo', 'id', 'producto', 'descripcion', 'pesoMedida', 'precio', 'imagen'];
      //var json = this.csvJSON(content);
      var json = this._valid.csvToJson(content, headers);
      this._activeRoute.params.subscribe( params => {
        this.tipo = params['tipo']


        for(const lC of this.listCatalogos){
          if (this.tipo == lC.catalogo) {
            this.title = lC.etiqueta;
          }
        }

        for (const ll of json) {
          if (ll.catalogo != '') {
            this.dataTableOriginal.push(
              {
                ...ll,
                cont: 0,
                ban: (ll.catalogo==this.tipo?true:false)
              }
            )
          }
        }
        this.dataTable = JSON.parse(JSON.stringify(this.dataTableOriginal))
        this.validLS();

      });
    });
  }

  search(){
    this.dataTable = this.dataTableOriginal.filter(data => {
      if (data.ban && (data.descripcion.toLowerCase().includes(this.busqueda) || data.producto.toLowerCase().includes(this.busqueda))) {
        return true;
      }
    });
  }

  alert(list) {

    var imgWidth = 0
    var imgheight = 0
    if (screen.width < 450) {
      imgWidth = 400;
      imgheight = 300;
    }
    if (screen.width >= 450 && screen.width < 620) {
      imgWidth = 450;
      imgheight = 350;
    }
    if (screen.width >= 620) {
      imgWidth = 600;
      imgheight = 500;
    }
    Swal.fire({
      imageUrl: 'assets/image/' + list.imagen,
      width: imgWidth + 'px',
      imageWidth: imgWidth,
      imageHeight: imgheight,
      imageAlt: list.producto,
    })
  }

  validLS(){
    var lls = this.ls.get('listCard');
    if (lls != undefined && lls != null && lls != '' && lls.length > 0) {
      for(const ll of this.dataTable){
        for(const lll of lls){
          if (ll.id == lll.id) ll.cont = lll.cont;
        }
      }
    }
  }

  cleanCatalogos(){
    for(const ll of this.dataTable) ll.cont = 0;
    this.subirLS();
  }

  hacerPedido() {
    this._router.navigate(['/pagina', 'compras']);
  }

  addOrRemoveCar(list, accion: string){
    if ( accion == 'add' || (accion == 'remove' && list.cont > 0)) {

      if (accion=='add') list.cont++;
      if (accion=='remove') list.cont--;

    }
    this.subirLS();

  }

  subirLS(){
    this.listCard = [];
    for(const ll of this.dataTable){
      if (ll.cont > 0) {
        this.listCard.push(ll);
      }
    }
    this.ls.set('listCard', this.listCard);


  }

  toggleModal(accion: string){
    if (accion == 'hide') {
      $("#modalCar").appendTo('body').modal('hide');
      setTimeout(() => {
        this.banModal = false;
      }, 1);
    } else {
      this.banModal = true;
      setTimeout(() => {
        $("#modalCar").appendTo('body').modal('show');
      }, 1);
      }
  }

  cleanCar(){
    this.ls.remove('listCard');
    $("#modalCar").appendTo('body').modal('hide');
    setTimeout(() => {
      this.banModal = false;
    }, 1);
    this.cleanCatalogos();
  }

  regresar() {
    this._router2.back();
  }

  destroyed() {
    this.moveDataSubs.unsubscribe();
  }

}
