import { Component, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  ls = new SecureLS({encodingType: 'aes'});
  listCar = [];
  urlMapa:string;
  mensaje = {
    nombre: '',
    telefono: '',
    correo: '',
    asunto: '',
    form: false,
    mensaje: ''
  }

  constructor() { }

  ngOnInit() {
    this.cargarMapa();
  }

  cargarMapa(){
    this.listCar = (this.ls.get('listCard')==undefined||this.ls.get('listCard')==null||this.ls.get('listCard')==''?[]:this.ls.get('listCard'));
    console.log('*_* : init: ', this.listCar);

    this.urlMapa = environment.apiConfig.urlmapa;
    $("#urlMapa").prop('src', this.urlMapa);
  }


}
