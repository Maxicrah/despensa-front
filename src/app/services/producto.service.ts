import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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

  deleteProduct(id:number):Observable<Producto>{
    return this._httpClient.delete<Producto>(this.apiURL + 'eliminar/' + id);
  }

  // createProduct(product: Producto, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('product', JSON.stringify(product));
  //   formData.append('file', file);

  //   return this._httpClient.post<any>(this.apiURL + 'crear', formData);
  // }

  // createProduct(formData: FormData): Observable<any> {
  //   return this._httpClient.post<any>(this.apiURL + 'crear', formData);
  // }

  createProducto(producto: Producto, imagen: File): Observable<Producto> {
    const formData: FormData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio.toString());
    formData.append('costo_adquisicion', producto.costo_adquisicion.toString());
     // Asegúrate de que `fecha_vencimiento` sea un objeto `Date`
     const fechaVencimiento = new Date(producto.fecha_vencimiento);
     formData.append('fecha_vencimiento', fechaVencimiento.toISOString().split('T')[0]);
    const fechaIngreso = new Date(producto.fecha_ingreso); 
    formData.append('fecha_ingreso', producto.fecha_ingreso.toISOString().split('T')[0]);
    formData.append('marca', producto.marca);
    formData.append('stock', producto.stock.toString());
    formData.append('promocion', producto.promocion);
    formData.append('notas_adicionales', producto.notas_adicionales);
    formData.append('imagen', imagen);

    return this._httpClient.post<Producto>(`${this.apiURL}crear`, formData);
  }

}
