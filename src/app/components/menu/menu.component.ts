import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  imgNavBar:string;

  constructor() { }

  ngOnInit() {
    this.cargaImagen();
  }

  cargaImagen(){
    this.imgNavBar = environment.apiConfig.urlImagenes.navbar;
    $("#imgNavBar").prop('src', this.imgNavBar);
  }

}
