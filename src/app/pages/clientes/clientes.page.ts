import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: Cliente[];

  constructor(private clientesService: ClientesService, private router: Router) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.mostrarClientes();
  }

  mostrarClientes(){
    this.clientesService.getClientes().subscribe(
      (data)=>{
        this.clientes = data;
      },
      (error)=>{
        console.error('Error al obtener clientes', error);
      }
    );
  }
  crearClientes(){
    this.router.navigate(['/crear-clientes']);
  }

  editarCliente(cliente: any){
    localStorage.setItem('cliente', JSON.stringify(cliente));
    this.router.navigate(['/editar-cliente']);
  }
}
