import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

  imgNavBar:string;

  constructor( private _router:Router) { }

  ngOnInit() {
    this.cargaImagen();
  }

  cargaImagen(){
    this.imgNavBar = environment.apiConfig.urlImagenes.navbar;
    $("#imgCard").prop('src', this.imgNavBar);
    $("#imgCard1").prop('src', this.imgNavBar);
    $("#imgCard2").prop('src', this.imgNavBar);
    $("#imgCard3").prop('src', this.imgNavBar);
    $("#imgCard4").prop('src', this.imgNavBar);
    $("#imgCard5").prop('src', this.imgNavBar);
  }

  detalleCatalogo(tipo:number){
    this._router.navigate(['/pagina','catalogo', tipo])
  }

}
