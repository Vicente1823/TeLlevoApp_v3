import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeEnVivoPage } from './viaje-en-vivo.page';

describe('ViajeEnVivoPage', () => {
  let component: ViajeEnVivoPage;
  let fixture: ComponentFixture<ViajeEnVivoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeEnVivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
