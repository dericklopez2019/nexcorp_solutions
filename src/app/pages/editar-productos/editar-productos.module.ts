import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarProductosPageRoutingModule } from './editar-productos-routing.module';

import { EditarProductosPage } from './editar-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarProductosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarProductosPage]
})
export class EditarProductosPageModule {}
