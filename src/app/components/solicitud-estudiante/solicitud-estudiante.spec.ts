import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudEstudiante } from './solicitud-estudiante';

describe('SolicitudEstudiante', () => {
  let component: SolicitudEstudiante;
  let fixture: ComponentFixture<SolicitudEstudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudEstudiante],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudEstudiante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
