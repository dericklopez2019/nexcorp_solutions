import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarProductosPage } from './editar-productos.page';

const routes: Routes = [
  {
    path: '',
    component: EditarProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarProductosPageRoutingModule {}
