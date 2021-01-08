import { Component, Input, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';
import { environment } from 'src/environments/environment';
import { MailService } from '../../../service/mail.service';
import { template_params } from '../../../models/mail.interface';
import { ValidacioneGlobalesService } from '../../../service/validaciones-globales.services';
declare var $:any;

@Component({
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.css']
})
export class FormEmailComponent implements OnInit {

  @Input() component:string;
  ls = new SecureLS({encodingType: 'aes'});
  listCar = [];
  urlMapa:string;
  banAsunto: boolean = false;
  mensaje = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    asunto: '',
    tipoAsunto: '',
    form: false,
    mensaje: ''
  }

  constructor(
    private _mail: MailService,
    private _valGlobals: ValidacioneGlobalesService
  ) { }

  ngOnInit() {
    console.log('*_*: ', this.component);

    this.cargarMapa();
  }

  cargarMapa(){
    this.listCar = (this.ls.get('listCard')==undefined||this.ls.get('listCard')==null||this.ls.get('listCard')==''?[]:this.ls.get('listCard'));
    console.log('*_* : init: ', this.listCar);

    this.urlMapa = environment.apiConfig.urlmapa;
    $("#urlMapa").prop('src', this.urlMapa);
  }

  async enviarMensaje(){
    var dataTemplate: template_params = {
      from_subject: (this.mensaje.tipoAsunto),
      from_name: this.mensaje.nombre,
      from_email: this.mensaje.correo,
      from_telephone: this.mensaje.telefono,
      from_message: this.mensaje.mensaje,
      from_direccion: (this.mensaje.direccion==''?'-----':this.mensaje.direccion),
      from_car:
      '<table style="border: 1px solid #000;">' +
      '<thead>' +
      '  <tr style="border: 1px solid #000;">' +
      '    <th scope="col">ID</th>' +
      '    <th scope="col">Catalogo</th>' +
      '    <th scope="col">Cantidad</th>' +
      '    <th scope="col">Producto</th>' +
      '    <th scope="col">Descripcion</th>' +
      '    <th scope="col">Peso/Medida</th>' +
      '    <th scope="col">Precio unidad</th>' +
      '    <th scope="col">Total</th>' +
      '  </tr>' +
      '</thead>' +
      ' <tbody>' +
      '#####' +
      '</tbody>' +
      '</table>' +
      '<br>'
      }

    var stringTemp = '';
    var totalArticulos = 0;
    var totalPrecio = 0;
    for (const ll of this.listCar) {
      stringTemp = stringTemp +
      '<tr style="border: 1px solid #000;">' +
        '<th scope="row">' + ll.id + '</th>' +
        '<td>' + ll.catalogo + '</td>' +
        '<td>' + ll.cont + '</td>' +
        '<td>' + ll.producto + '</td>' +
        '<td>' + ll.descripcion + '</td>' +
        '<td>' + ll.pesoMedida + '</td>' +
        '<td>' + this._valGlobals.numberFormat(ll.precio, 2, '.', ',') + '</td>' +
        '<td>' + this._valGlobals.numberFormat((+ll.cont * +ll.precio), 2, '.', ',') + '</td>' +
      '</tr>';
      totalArticulos = +totalArticulos + +ll.cont;
      totalPrecio = +totalPrecio + (+ll.cont * +ll.precio);
    }
    stringTemp = stringTemp +
      '<tr style="border: 1px solid #000;">' +
        '<th scope="row"></th>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
      '</tr>';

    stringTemp = stringTemp +
      '<tr style="border: 1px solid #000;">' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<th scope="row">Total articulos</th>' +
        '<td>' + totalArticulos + '</td>' +
      '</tr>';

    stringTemp = stringTemp +
      '<tr style="border: 1px solid #000;">' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
        '<th scope="row">Total (mxn)</th>' +
        '<td>' + this._valGlobals.numberFormat(totalPrecio, 2, '.', ',') + '</td>' +
      '</tr>';

    dataTemplate.from_car = dataTemplate.from_car.replace('#####', stringTemp);
    console.log('Enviar mensaje: ', this.mensaje, dataTemplate);

    this._mail.sendMail(dataTemplate).subscribe(result => {
      console.log('*_* respuesta de mail: ', result);
    }, error => {
      console.log('*_* error: ', error);
    });

  }

  selectedAsunto(){
    if (this.mensaje.tipoAsunto == '') {
      this.banAsunto = false;
    } else {
      this.banAsunto = true;
    }
  }

}
