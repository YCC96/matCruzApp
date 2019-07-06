import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  constructor() { }

  mensaje:any = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  }

  ngOnInit() {
  }

  enviarMensaje(){
    console.log('Enviar mensaje: ', this.mensaje);
  }

}
