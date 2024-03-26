import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [

  ]
})
export class ByCapitalPageComponent implements OnInit {

  public capi: Country[]=[];
  public isLoading: boolean = false;
  public initialValue: string = "";
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.capi=this.countriesService.cacheStore.byCap.countries;
    this.initialValue=this.countriesService.cacheStore.byCap.term;
  }

  searchByCapital(term:string):void {
    this.isLoading= true;
  //mandamos lo obtenido en el input, al metodo de busqueda
   this.countriesService.searchCapital( term )
  //nos suscribimos al Observable, para que podamos interactuar con el
   .subscribe( countries => {
    this.capi = countries;
    this.isLoading= false;
   });


  //imprimimos para ver que si se está recibiendo la información
   console.log({term})
  }
}
