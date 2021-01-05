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
  listCard:any = [];
  listValid = [];
  listCatalogos = [];

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
      console.log('*_* result: ', result);
      if (result && result == 'cleanAll') this.cleanCatalogos();
    });
  }

  getFile() {
    this.dataTable = [];
    fetch('assets/docs/catalogo.csv')
    .then(res => res.text())
    .then(content => {
      var headers = ['catalogo', 'id', 'producto', 'descripcion', 'pesoMedida', 'imagen'];
      //var json = this.csvJSON(content);
      var json = this._valid.csvToJson(content, headers);
      this._activeRoute.params.subscribe( params => {
        this.tipo = params['tipo']
        console.log('*_*: ', json);

        for(const lC of this.listCatalogos){
          if (this.tipo == lC.catalogo) {
            this.title = lC.etiqueta;
          }
        }
        
        for (const ll of json) {
          this.dataTable.push(
            {
              ...ll,
              cont: 0,
              ban: (ll.catalogo==this.tipo?true:false)
            }
          )
        }
        this.validLS();
        console.log('*_* dataTable: ', this.dataTable);
      });
    });
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
    this._router.navigate(['/pagina', 'compras-por-telefono']);
  }

  addOrRemoveCar(list, accion: string){
    if ( accion == 'add' || (accion == 'remove' && list.cont > 0)) {
      console.log('*_* entro: ', this.dataTable)
      if (accion=='add') list.cont++;
      if (accion=='remove') list.cont--;
      console.log(list.cont)
    }
    this.subirLS();
    console.log('*_* addOrRemove:', accion, list.cont, this.dataTable);
  }

  subirLS(){
    this.listCard = [];
    for(const ll of this.dataTable){
      if (ll.cont > 0) {
        this.listCard.push(ll);
      }
    }
    this.ls.set('listCard', this.listCard);
    console.log('*_* LS: ', this.listCard);
    
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
