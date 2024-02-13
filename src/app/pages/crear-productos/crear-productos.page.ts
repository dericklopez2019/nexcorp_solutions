import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.page.html',
  styleUrls: ['./crear-productos.page.scss'],
})
export class CrearProductosPage implements OnInit {
  formProducto: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.formProducto = this.fb.group({
      Nombre: ['', Validators.required],
      PrecioCosto: ['', Validators.required],
      Fletes: ['', Validators.required],
      Categoria: ['', Validators.required],
      Iva: ['', Validators.required],
      PrecioVenta: ['', Validators.required],
      Existencias: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async crearProducto() {
    const formDatos = this.formProducto.value;

    const loading = await this.loadingController.create({
      message: 'Creando producto...',
    });
    await loading.present();

    this.productosService.crearProducto(formDatos).subscribe(
      (response) => {
       // console.log('Producto creado exitosamente:', response);
        loading.dismiss();
        this.mostrarMensaje('Producto creado exitosamente', 'success');
        this.router.navigate(['/productos']);
      },
      (error) => {
       // console.error('Error al crear producto:', error);
        loading.dismiss();
        this.mostrarMensaje('Error al crear producto', 'danger');
      }
    );
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    await toast.present();
  }
}
