import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControllerPageRoutingModule } from './controller-routing';

describe('ControllerPage', () => {
  let component: ControllerPageRoutingModule;
  let fixture: ComponentFixture<ControllerPageRoutingModule>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerPageRoutingModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
