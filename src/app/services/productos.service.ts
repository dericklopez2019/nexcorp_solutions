import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/productos';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlProductos: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.urlProductos = this.config.getUrl('productos');
  }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlProductos);
  }

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<any> {
    return this.http.post(this.urlProductos, producto);
  }

  // Actualizar un producto existente
  actualizarProducto(codigo: number, producto: Producto): Observable<any> {
    const url = `${this.urlProductos}/${codigo}`;
    return this.http.put(url, producto);
  }

  // Eliminar un producto
  eliminarProducto(codigo: number): Observable<any> {
    const url = `${this.urlProductos}/${codigo}`;
    return this.http.delete(url);
  }
}

