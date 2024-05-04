import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCitaComponent } from './consultar-cita.component';

describe('ConsultarCitaComponent', () => {
  let component: ConsultarCitaComponent;
  let fixture: ComponentFixture<ConsultarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarCitaComponent]
    });
    fixture = TestBed.createComponent(ConsultarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
