import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { ComprasTelefonoComponent } from './components/content-pages/compras-telefono/compras-telefono.component';
import { ContactanosComponent } from './components/content-pages/contactanos/contactanos.component';
import { NosotrosComponent } from './components/content-pages/nosotros/nosotros.component';
import { InicioComponent } from './components/content-pages/inicio/inicio.component';
import { CatalogoComponent } from './components/content-pages/catalogo/catalogo.component';
import { CatalogosComponent } from './components/content-pages/catalogos/catalogos.component';
import { CarritoComponent } from './components/content-pages/carrito/carrito.component'

import { MoveDataService } from './service/move-data.service';
import { ValidacioneGlobalesService } from './service/validaciones-globales.services';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ContentComponent,
    PrincipalPageComponent,
    ComprasTelefonoComponent,
    ContactanosComponent,
    NosotrosComponent,
    InicioComponent,
    CatalogoComponent,
    CatalogosComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    MoveDataService,
    ValidacioneGlobalesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
