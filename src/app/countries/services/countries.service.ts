import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})

export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCap:  {term:  '',countries:[]},
    byCount:{term:  '',countries:[]},
    byRegion:{region:'',countries:[]},
  }

  constructor(private http: HttpClient) {
    this.loadFromLS();
  }

  private saveToLS (){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLS (){
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse (localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest (url:string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( error => of([]) )
    );
  }

  searchByAlphaCode(code:string):Observable<Country | null>{

    const url =`${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]:null),
        catchError( error => of(null) )
      );
  }

  searchCapital(term:string):Observable<Country[]>{
    const url =`${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCap = {term, countries}),
        tap ( ()=> this.saveToLS()  )
      )
  }

  searchCountry(term:string):Observable<Country[]>{
    const url =`${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCount = {term, countries}),
      tap ( ()=> this.saveToLS()  )
    )
  }

  searchRegion(region:Region):Observable<Country[]>{
    const url =`${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion ={ region , countries} ),
      tap ( ()=> this.saveToLS()  )
      // tap( countries => this.CacheStore.byReg = { term:region, countries:countries})
    );
  }

      // searchCapital(term:string):Observable<Country[]>{
      //   //la url se puede almacenar como una constante, con sus variables internas
      //   const url =`${this.apiUrl}/capital/${term}`;

      //   //así nuestro mensaje de retorno es más sencillo de leer
      //   return this.http.get<Country[]>(url)

      //   .pipe(
      //     //EN CASO DE QUE SE PRESENTE UN ERROR
      //     //ESTA ACCIÓN DBE IR EN EL SERVICIO, PORQUE ASÍ, PODREMOS UTILIZARLO
      //     //EN DISTINTOS LUGARES SIN TENER QUE ESPECIFICAR ESTA ACCIÓN A CADA RATO EN OTROS LADOS
      //     catchError( error => of([]) ) // ESTE OF, REGRESARÁ UN NUEVO OBJETO VACÍO
      //   );
      // }
}
