import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import SecureLS from 'secure-ls';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MoveDataService } from '../../../service/move-data.service';
import { ValidacioneGlobalesService } from '../../../service/validaciones-globales.services';
import { CatalogosInterface } from '../../../models/catalogos.interface';
declare var $:any;

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  private moveDataSubs: Subscription;

  tipo: string = '';
  value: string = '';

  title: string = '';

  dataTable = [];
  dataTableOriginal = [];
  listCard:any = [];
  listValid = [];
  listaIdsAgregados = [];
  listCatalogos: CatalogosInterface;
  busqueda: string = '';

  ls = new SecureLS({encodingType: 'aes'});

  banModal: boolean = false;

  constructor(
    private _activeRoute:ActivatedRoute,
    private _router: Router,
    private _router2: Location,
    private _moveData: MoveDataService,
    private _valid: ValidacioneGlobalesService
    ) { }

  ngOnInit() {
    var catalogosLS = (this.ls.get('listCatalogos') != undefined && this.ls.get('listCatalogos') != null && this.ls.get('listCatalogos') != ''? this.ls.get('listCatalogos') : null);
    if (catalogosLS == null) {
      this._router.navigate(['/pagina','catalogos']);
    } else {
      this.listCatalogos = catalogosLS;
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
    fetch('assets/docs/productos.csv')
    .then(res => res.text())
    .then(content => {
      var headers = ['id', 'catalogo', 'marca', 'producto', 'descripcion', 'medida', 'precio', 'imagen'];
      var json = this._valid.csvToJson(content, headers);
      this._activeRoute.params.subscribe( params => {
        this.tipo = params['tipo'];
        this.value = params['value'];
        var listBuscarTitle = (this.tipo=='catalogo'?this.listCatalogos.listCatalogos:this.tipo=='marca'?this.listCatalogos.listMarcas:[])
        for(const lC of listBuscarTitle){
          if (this.value == lC[this.tipo]) {
            this.title = lC.etiqueta;
          }
        }
        this.agruparData(JSON.parse(JSON.stringify(json)));
      });
    });
  }

  agruparData(json){
    var temp = [];
    for (const list of json) {
      if (!this.validIfIdAdd(list.id) && list.id != '') {
        var resSearch = json.filter(data => {
          return (data.id == list.id);
        });
        if (resSearch.length > 0) {
          var listIdTemp = [];
          for(const ll of resSearch){
            listIdTemp.push({
              cont: 0,
              descripcion: ll.descripcion,
              medida: ll.medida,
              precio: ll.precio,
              producto: ll.producto
            })
          }
          temp.push(
            {
              id: list.id,
              imagen: list.imagen,
              catalogo: list.catalogo,
              marca: list.marca,
              ban: (list[this.tipo].toLowerCase()==this.value.toLowerCase()?true:false),
              banLS: false,
              selected: {
                ...listIdTemp[0]
              },
              opciones: listIdTemp
            }
          );
        }
      }
    }
    this.dataTableOriginal = JSON.parse(JSON.stringify(temp));
    this.dataTable = JSON.parse(JSON.stringify(temp));
    this.validLS();
  }

  validIfIdAdd(id: string): boolean{
    var respuesta = false;
    var busca = this.listaIdsAgregados.filter(idd => {
      return (idd == id)
    });
    if (busca.length == 0) {
      this.listaIdsAgregados.push(id);
    } else {
      respuesta = true;
    }
    return respuesta;
  }

  changeCosto(selected: string ,list){
    var search = list.opciones.filter(data => {
      return (data.medida.toLowerCase() == selected.toLowerCase())
    });
    if (search.length > 0) {
      list.selected = search[0];
    }
  }

  search(){
    this.dataTable = this.dataTableOriginal.filter(data => {
      if (data.ban && (data.selected.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) || data.selected.producto.toLowerCase().includes(this.busqueda.toLowerCase()))) {
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
          if(ll.id == lll.id){
            for(const llJ of ll.opciones){
              for(const lllJ of lll.opciones){
                if (llJ.medida == lllJ.medida) {
                  llJ.cont = lllJ.cont;
                }
              }
            }

          }
        }
        ll.selected.cont = ll.opciones[0].cont;
      }
    }
  }

  cleanCatalogos(){
    for(const ll of this.dataTable){
      ll.selected.cont = 0;
      for(const lll of ll.opciones) lll.cont = 0;
    }
    this.subirLS();
  }

  hacerPedido() {
    this._router.navigate(['/pagina', 'compras']);
  }

  addOrRemoveCar(list, accion: string){
    var search = list.opciones.filter(data => {
      return (data.medida.toLowerCase() == list.selected.medida.toLowerCase())
    });
    if (search.length > 0) {
      if ( accion == 'add' || (accion == 'remove' && search[0].cont > 0)) {

        if (accion=='add'){
          search[0].cont++;
        };
        if (accion=='remove'){
          search[0].cont--;
        }
      }
      list.selected.cont = search[0].cont;
    }
    this.subirLS();
  }

  subirLS(){
    this.listCard = [];
    for(const ll of this.dataTable){
      ll.banLS = false;
      for(const lll of ll.opciones){
        if (lll.cont > 0) {
          ll.banLS = true;
        }
      }
      if(ll.banLS){
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
