import { Component, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  ls = new SecureLS({encodingType: 'aes'});
  listCar = [];
  totalArticulos: number = 0;
  totalPrecio: number = 0;
  flag: boolean = true;

  constructor() { }

  ngOnInit() {
    this.cargarList();
  }

  cargarList(){
    var listCarLS = this.ls.get('listCard');
    if (listCarLS && listCarLS.length > 0){
      var temp = [];
      for (const ll of listCarLS) {
        for(const lll of ll.opciones){
          if(lll.cont > 0){
            temp.push(
              {
                id: ll.id,
                cantidad: lll.cont,
                producto: lll.producto,
                medida: lll.medida,
                precioUnidad: lll.precio,
                subTotal: (+lll.cont * +lll.precio)
              }
            );
            this.totalArticulos = +this.totalArticulos + +lll.cont;
            this.totalPrecio = +this.totalPrecio + (+lll.cont * +lll.precio);

          }
        }
      }
      this.listCar = temp;
      this.flag = false;
    }
  }
}
