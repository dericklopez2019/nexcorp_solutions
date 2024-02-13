import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private urlClientes: string;


  constructor(private http: HttpClient, private config:ConfigService) {
    this.urlClientes = this.config.getUrl('clientes');
   }

   // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlClientes);
  }
  // Crear un nuevo cliente
  crearCliente(cliente: Cliente): Observable<any> {
    return this.http.post(this.urlClientes, cliente);
  }

  // Actualizar un cliente existente
  actualizarCliente(id: number, cliente: Cliente): Observable<any> {
    const url = `${this.urlClientes}/${id}`;
    return this.http.put(url, cliente);
  }

  // Eliminar un cliente
  eliminarCliente(id: number): Observable<any> {
    const url = `${this.urlClientes}/${id}`;
    return this.http.delete(url);
  }
}
