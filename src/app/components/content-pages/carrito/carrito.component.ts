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
    this.listCar = this.ls.get('listCard');
    if (this.listCar && this.listCar.length > 0){
      this.flag = false
      for (const ll of this.listCar) {
        this.totalArticulos = +this.totalArticulos + +ll.cont;
        this.totalPrecio = +this.totalPrecio + (+ll.cont * +ll.precio);
      }
    }
    console.log('*_* listCard table: ', this.listCar);
  }
}
