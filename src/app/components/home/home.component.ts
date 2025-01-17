import { Component, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    private _productoService = inject(ProductoService)

    productos: Producto[] = []
  // productos: Producto[] = [
  //   { nombre: 'Azúcar', descripcion: 'Azúcar refinada de alta calidad', precio: 120, imagen: 'ruta/a/imagen/azucar.jpg' },
  //   { nombre: 'Galletas Saladas', descripcion: 'Galletas crujientes y saladas', precio: 150, imagen: 'ruta/a/imagen/galletas-saladas.jpg' },
  //   { nombre: 'Galletas Dulces', descripcion: 'Galletas dulces deliciosas', precio: 180, imagen: 'ruta/a/imagen/galletas-dulces.jpg' },
  //   { nombre: 'Yogur', descripcion: 'Yogur natural y saludable', precio: 200, imagen: 'ruta/a/imagen/yogur.jpg' }
  // ];

  getProductos():void{
    this._productoService.getAllProducts().subscribe(
      (data: Producto[]) => {
          //console.log(data);
          this.productos = data;
        },
      (error: any) => {
        console.error('Error:', error);
      }
      )
  }

  constructor(){
    this.getProductos();
  }

  deleteProducto(id: number) {
    this._productoService.deleteProduct(id).subscribe(
      (data: Producto) => {
        // Manejar la respuesta exitosa aquí
        console.log('Producto eliminado exitosamente:', data);
        this.getProductos(); // Refrescar la lista de productos
      },
      (error: any) => {
        // Manejar errores aquí
        console.error('Error al eliminar el producto:', error);
      }
    );

  // deleteProducto(id:number){
  //   this._productoService.deleteProduct(id).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       this.getProductos();
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   )
  // }

  



}
}
