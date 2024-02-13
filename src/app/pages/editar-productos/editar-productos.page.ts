import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.page.html',
  styleUrls: ['./editar-productos.page.scss'],
})
export class EditarProductosPage implements OnInit {
  formEditProducto: FormGroup;
  producto: any;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.formEditProducto =  this.fb.group({
      Nombre: ['', Validators.required],
      PrecioCosto: ['', Validators.required],
      Fletes: ['', Validators.required],
      Categoria: ['', Validators.required],
      Iva: ['', Validators.required],
      PrecioVenta: ['', Validators.required],
      Existencias: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.producto = JSON.parse(localStorage.getItem('producto'));

    this.formEditProducto.patchValue({
      Nombre: this.producto.Nombre,
      PrecioCosto: this.producto.PrecioCosto,
      Fletes: this.producto.Fletes,
      Categoria: this.producto.Categoria,
      Iva: this.producto.Iva,
      PrecioVenta: this.producto.PrecioVenta,
      Existencias: this.producto.Existencias,
    });
  }
  guardarCambios() {
    const productoActualizado = this.formEditProducto.value;
    this.productosService.actualizarProducto(this.producto.Codigo, productoActualizado)
      .subscribe(
        (response) => {
          console.log('Producto actualizado exitosamente:', response);
          this.mostrarMensaje('Producto actualizado exitosamente', 'success');
          this.router.navigate(['/productos']);
        },
        (error) => {
          //console.error('Error al actualizar producto:', error);
          this.mostrarMensaje('Error al guardar el producto', 'danger');

        }
      );
  }

  async eliminarProducto() {
    const confirmacion = await this.mostrarAlertaConfirmacion();

    if (confirmacion) {
      this.productosService.eliminarProducto(this.producto.Codigo)
        .subscribe(
          (response) => {
           // console.log('Producto eliminado exitosamente:', response);
            this.mostrarMensaje('Producto eliminado exitosamente', 'success');
            this.router.navigate(['/productos']);
          },
          (error) => {
            //console.error('Error al eliminar producto:', error);
            this.mostrarMensaje('Error al eliminar el producto', 'danger');

          }
        );
    }
  }

  async mostrarAlertaConfirmacion(): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Seguro que quieres eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            return false;
          }
        },
        {
          text: 'Aceptar',
          role: 'accept',
          handler: () => {
            return true;
          }
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    return role === 'accept';
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
