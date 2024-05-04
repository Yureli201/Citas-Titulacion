import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarCitasComponent } from './administrar-citas.component';

describe('AdministrarCitasComponent', () => {
  let component: AdministrarCitasComponent;
  let fixture: ComponentFixture<AdministrarCitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarCitasComponent]
    });
    fixture = TestBed.createComponent(AdministrarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
