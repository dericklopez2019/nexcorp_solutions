import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from '../interfaces/interfaces';
import { MenuController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  componentes: Observable<Componente[]>;

  constructor(private menuCtrl: MenuController, private dataService: DataService ) {}
  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }
  mostrarMenu(){
    this.menuCtrl.open('first');
  }
}
