import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countri: Country[]=[];
  public isLoading: boolean = false;
  public initialValue: string = "";
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countri=this.countriesService.cacheStore.byCount.countries;
    this.initialValue=this.countriesService.cacheStore.byCount.term;
  }

  searchByCountry(term:string):void {
    this.isLoading= true;
  //mandamos lo obtenido en el input, al metodo de busqueda
   this.countriesService.searchCountry( term )
  //nos suscribimos al Observable, para que podamos interactuar con el
   .subscribe( countries => {
    this.countri = countries;
    this.isLoading= false;
   });


  //imprimimos para ver que si se está recibiendo la información
   console.log({term})
  }
}
