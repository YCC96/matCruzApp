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

  imgCard1:string;
  imgCard2:string;
  imgCard3:string;
  imgCard4:string;
  imgCard5:string;
  imgCard6:string;

  constructor( private _router:Router) { }

  ngOnInit() {
    this.cargaImagen();
  }

  cargaImagen(){
    this.imgCard1 = environment.apiConfig.urlImagenes.catalogos.construccion;
    this.imgCard2 = environment.apiConfig.urlImagenes.catalogos.plomeria;
    this.imgCard3 = environment.apiConfig.urlImagenes.catalogos.electrico;
    this.imgCard4 = environment.apiConfig.urlImagenes.catalogos.hogar;
    this.imgCard5 = environment.apiConfig.urlImagenes.catalogos.gas;
    this.imgCard6 = environment.apiConfig.urlImagenes.catalogos.electrico;
    $("#imgCard1").prop('src', this.imgCard1);
    $("#imgCard2").prop('src', this.imgCard2);
    $("#imgCard3").prop('src', this.imgCard3);
    $("#imgCard4").prop('src', this.imgCard4);
    $("#imgCard5").prop('src', this.imgCard5);
    $("#imgCard6").prop('src', this.imgCard6);
  }

  detalleCatalogo(tipo:number){
    this._router.navigate(['/pagina','catalogo', tipo])
  }

}
