import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { ComprasTelefonoComponent } from './components/content-pages/compras-telefono/compras-telefono.component';
import { ContactanosComponent } from './components/content-pages/contactanos/contactanos.component';
import { NosotrosComponent } from './components/content-pages/nosotros/nosotros.component';
import { InicioComponent } from './components/content-pages/inicio/inicio.component';
import { CatalogosComponent } from './components/content-pages/catalogos/catalogos.component';
import { CatalogoComponent } from './components/content-pages/catalogo/catalogo.component';

const routes: Routes = [
  { path: 'pagina', component: PrincipalPageComponent, children:[
    {path: 'catalogos', component: CatalogosComponent },
    {path: 'catalogo/:tipo', component: CatalogoComponent },
    {path: 'compras', component: ComprasTelefonoComponent },
    {path: 'contactanos', component: ContactanosComponent },
    {path: 'nosotros', component: NosotrosComponent },
    {path: 'inicio', component: InicioComponent }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: '/pagina/inicio' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
