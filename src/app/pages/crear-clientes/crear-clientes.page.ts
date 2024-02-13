import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-crear-clientes',
  templateUrl: './crear-clientes.page.html',
  styleUrls: ['./crear-clientes.page.scss'],
})
export class CrearClientesPage implements OnInit {

  formCliente: FormGroup;
  constructor(
    private fb:FormBuilder,
    private clientesService: ClientesService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.formCliente = this.fb.group({
      Apellidos: ['', Validators.required],
      Nombres: ['', Validators.required],
      Direccion: ['', Validators.required],
      Nit: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      TieneCredito: [false],
      LimiteCredito: ['', Validators.required],
      Telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    });

  }

  ngOnInit() {
  }

  async crearCliente() {
    const formDatos = this.formCliente.value;

    const loading = await this.loadingController.create({
      message: 'Creando cliente...',
    });
    await loading.present();

    this.clientesService.crearCliente(formDatos).subscribe(
      (response) => {

        console.log('Cliente creado exitosamente:', response);
        loading.dismiss();
        this.mostrarMensaje('Cliente creado exitosamente', 'success');
        this.router.navigate(['/clientes']);

      },
      (error) => {

        console.error('Error al crear cliente:', error);
        loading.dismiss();
        this.mostrarMensaje('Error al crear cliente', 'danger');
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
