import { Component, Input, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';
import { environment } from 'src/environments/environment';
import { MailService } from '../../../service/mail.service';
import { template_params } from '../../../models/mail.interface';
import { ValidacioneGlobalesService } from '../../../service/validaciones-globales.services';
import Swal from 'sweetalert2';
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
  banSpinner: boolean = false;
  mensaje = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    asunto: '',
    tipoAsunto: '',
    mensaje: ''
  }

  constructor(
    private _mail: MailService,
    private _valGlobals: ValidacioneGlobalesService
  ) { }

  ngOnInit() {
    this.cargarMapa();
  }

  cargarMapa(){
    this.listCar = (this.ls.get('listCard')==undefined||this.ls.get('listCard')==null||this.ls.get('listCard')==''?[]:this.ls.get('listCard'));
    this.urlMapa = environment.apiConfig.urlmapa;
    $("#urlMapa").prop('src', this.urlMapa);
  }

  async enviarMensaje(){
    var stringTemp = '';
    var totalArticulos = 0;
    var totalPrecio = 0;
    this.banSpinner = true;
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
      '    <th scope="col">Medida</th>' +
      '    <th scope="col">Producto</th>' +
      '    <th scope="col">Descripcion</th>' +
      '    <th scope="col">Precio unidad</th>' +
      '    <th scope="col">Subtotal</th>' +
      '  </tr>' +
      '</thead>' +
      ' <tbody>' +
      '#####' +
      '</tbody>' +
      '</table>' +
      '<br>'
      }

    for (const ll of this.listCar) {
      for(const lll of ll.opciones){
        if(lll.cont > 0){
          stringTemp = stringTemp +
            '<tr style="border: 1px solid #000;">' +
              '<th scope="row">' + ll.id + '</th>' +
              '<td>' + ll.catalogo + '</td>' +
              '<td>' + lll.cont + '</td>' +
              '<td>' + lll.medida + '</td>' +
              '<td>' + lll.producto + '</td>' +
              '<td>' + lll.descripcion + '</td>' +
              '<td>' + this._valGlobals.numberFormat(lll.precio, 2, '.', ',') + '</td>' +
              '<td>' + this._valGlobals.numberFormat((+lll.cont * +lll.precio), 2, '.', ',') + '</td>' +
            '</tr>';
          totalArticulos = +totalArticulos + +lll.cont;
          totalPrecio = +totalPrecio + (+lll.cont * +lll.precio);

        }
      }
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
    this._mail.sendMail(dataTemplate).subscribe(result => {
      this.banSpinner = false;
      if (result.status == 200) {
        this.alertExito();
      }
    }, error => {
      this.banSpinner = false;
      if (error.status == 200) {
        this.alertExito();
      }
    });
  }

  selectedAsunto(){
    if (this.mensaje.tipoAsunto == '') {
      this.banAsunto = false;
    } else {
      this.banAsunto = true;
    }
  }

  alertExito(){
    this.cleanForm();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Tu pedido se envio con éxito.',
      showConfirmButton: false,
      timer: 3000
    })
  }

  cleanForm(){
    this.mensaje.asunto = '';
    this.mensaje.correo = '';
    this.mensaje.direccion = '';
    this.mensaje.mensaje = '';
    this.mensaje.nombre = '';
    this.mensaje.telefono = '';
    this.mensaje.tipoAsunto = '';
  }

}
