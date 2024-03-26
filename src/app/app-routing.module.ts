import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { CountriesRoutingModule } from './countries/countries-routing.module';
import { CountriesModule } from './countries/countries.module';

//Configuración Básica de un Router
const routes:Routes=[
/* Aquí especificamos qué componente queremos que se muestre, dependiendo
   de la palabra que tengamos en la url del buscador
{
  path:'',
  component: HomePageComponent
},*/
{
  path: 'about',
  component: AboutPageComponent
},
{
  path:'contact',
  component: ContactPageComponent
},
{
  path:'countries',
  loadChildren: ()=> import('./countries/countries.module').then(m=> m.CountriesModule)
},
//aquí redirigimos cuando no haya ninguna palabra en el buscador
//o cuando estemos en el localhost
{
  path: '**',
  redirectTo:'countries'
}];

@NgModule({
  imports:[
    //se utiliza un forRoot, cuando se trata del principal archivo de routing
    //si fuera en otros componentes, se utilizaría el forChild
    RouterModule.forRoot(routes),
    CountriesRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
