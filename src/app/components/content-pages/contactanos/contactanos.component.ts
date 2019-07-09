import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  
  urlMapa:string;
  mensaje:any = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  }

  constructor() { }
  
  ngOnInit() {
    this.cargarMapa();
  }
  
  cargarMapa(){
    this.urlMapa = environment.apiConfig.urlmapa;
    $("#urlMapa").prop('src', this.urlMapa);
  }

  enviarMensaje(){
    console.log('Enviar mensaje: ', this.mensaje);
  }

}
