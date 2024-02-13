import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  formEditCliente: FormGroup;
  cliente: any;
  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {
    this.formEditCliente =  this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: ['', Validators.required],
      Nit: ['', Validators.required],
      Direccion: ['', Validators.required],
      TieneCredito: [false],
      LimiteCredito: [''],
    });
  }

  ngOnInit() {
     this.cliente = JSON.parse(localStorage.getItem('cliente'));

    this.formEditCliente.patchValue({
      Nombres: this.cliente.Nombres,
      Apellidos: this.cliente.Apellidos,
      Telefono: this.cliente.Telefono,
      Nit: this.cliente.Nit,
      Direccion: this.cliente.Direccion,
      TieneCredito: this.cliente.TieneCredito,
      LimiteCredito: this.cliente.LimiteCredito,
    });
  }
  guardarCambios() {
    const clienteActualizado = this.formEditCliente.value;
    this.clientesService.actualizarCliente(this.cliente.Codigo, clienteActualizado)
      .subscribe(
        (response) => {
          console.log('Cliente actualizado exitosamente:', response);
        this.mostrarMensaje('Cliente actualizado exitosamente', 'success');
        this.router.navigate(['/clientes']);
        },
        (error) => {
          //console.error('Error al actualizar cliente:', error);
          this.mostrarMensaje('Error al guardar el cliente', 'danger');
        }
      );
  }

  async eliminarCliente() {
    const confirmacion = await this.mostrarAlertaConfirmacion();

    if (confirmacion) {
      this.clientesService.eliminarCliente(this.cliente.Codigo)
        .subscribe(
          (response) => {
            //console.log('Cliente eliminado exitosamente:', response);
            this.mostrarMensaje('Cliente eliminado exitosamente', 'success');
            this.router.navigate(['/clientes']);
          },
          (error) => {
            //console.error('Error al eliminar cliente:', error);
            this.mostrarMensaje('Error al eliminar el cliente', 'danger');

          }
        );
    } else {
      console.log('Eliminación cancelada por el usuario');
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

    return role === 'acept';
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
