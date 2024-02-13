import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'editar-cliente',
    loadChildren: () => import('./pages/editar-cliente/editar-cliente.module').then( m => m.EditarClientePageModule)
  },
  {
    path: 'crear-clientes',
    loadChildren: () => import('./pages/crear-clientes/crear-clientes.module').then( m => m.CrearClientesPageModule)
  },
  {
    path: 'crear-productos',
    loadChildren: () => import('./pages/crear-productos/crear-productos.module').then( m => m.CrearProductosPageModule)
  },
  {
    path: 'editar-productos',
    loadChildren: () => import('./pages/editar-productos/editar-productos.module').then( m => m.EditarProductosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
