import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProductosPage } from './editar-productos.page';

describe('EditarProductosPage', () => {
  let component: EditarProductosPage;
  let fixture: ComponentFixture<EditarProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
