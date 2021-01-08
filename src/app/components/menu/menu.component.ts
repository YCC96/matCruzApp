import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import SecureLS from 'secure-ls';
import { MoveDataService } from '../../service/move-data.service';
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  imgNavBar:string;
  banModal: boolean = false;
  ls = new SecureLS({encodingType: 'aes'});

  constructor(
    private _moveData: MoveDataService
  ) { }

  ngOnInit() {
    this.cargaImagen();
  }

  cargaImagen(){
    this.imgNavBar = environment.apiConfig.urlImagenes.navbar;
    $("#imgNavBar").prop('src', this.imgNavBar);
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
    this._moveData.sendData('cleanAll');
  }

  menu(data){

  }

}
