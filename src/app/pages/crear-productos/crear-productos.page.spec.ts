import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearProductosPage } from './crear-productos.page';

describe('CrearProductosPage', () => {
  let component: CrearProductosPage;
  let fixture: ComponentFixture<CrearProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
