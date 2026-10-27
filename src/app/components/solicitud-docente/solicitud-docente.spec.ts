import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDocente } from './solicitud-docente';

describe('SolicitudDocente', () => {
  let component: SolicitudDocente;
  let fixture: ComponentFixture<SolicitudDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudDocente],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudDocente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
