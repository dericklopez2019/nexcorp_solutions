import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: Producto[];

  constructor(
    private productosService: ProductosService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.mostrarProductos();
  }

  mostrarProductos() {
    this.productosService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  crearProducto() {
    this.router.navigate(['/crear-productos']);
  }

  editarProducto(producto: any) {
    localStorage.setItem('producto', JSON.stringify(producto));
    this.router.navigate(['/editar-productos']);
  }
}
