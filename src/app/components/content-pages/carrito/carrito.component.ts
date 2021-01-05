import { Component, OnInit } from '@angular/core';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  listCar = [];
  ls = new SecureLS({encodingType: 'aes'});
  flag: boolean = true;

  constructor() { }

  ngOnInit() {
    this.cargarList();
  }
  
  cargarList(){
    this.listCar = this.ls.get('listCard');
    if (this.listCar && this.listCar.length > 0) this.flag = false;
    console.log('*_* listCard table: ', this.listCar, this.ls.get('listCard'));
  }
}
