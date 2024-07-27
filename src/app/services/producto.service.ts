import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiURL= 'http://localhost:8083/productos/'

  private readonly _httpClient = inject(HttpClient);


  getAllProducts():Observable<Producto[]>{
    return this._httpClient.get<Producto[]>(this.apiURL + 'traer');
  }


  constructor() { }
}
