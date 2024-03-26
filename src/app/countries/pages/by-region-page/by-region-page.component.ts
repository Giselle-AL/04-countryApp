import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[]=[];
  public regions:Region[]=['Africa','Americas', 'Asia', 'Europe','Oceania'];
  public isLoading: boolean = false;
  public selectedReg?: Region;
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedReg=this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term:Region):void {
    this.isLoading= true;

    this.selectedReg= term;
  //mandamos lo obtenido en el input, al metodo de busqueda
   this.countriesService.searchRegion( term )
  //nos suscribimos al Observable, para que podamos interactuar con el
   .subscribe( countries => {
    this.countries = countries;
    this.isLoading= false;
   });


  //imprimimos para ver que si se está recibiendo la información
   console.log({term})
  }
}
