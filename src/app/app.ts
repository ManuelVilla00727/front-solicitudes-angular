import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SolicitudEstudianteComponent } from './components/solicitud-estudiante/solicitud-estudiante';
import { SolicitudDocenteComponent } from './components/solicitud-docente/solicitud-docente';
import { CommonModule } from '@angular/common'; // Necesario para el ngSwitch

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SolicitudEstudianteComponent, SolicitudDocenteComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'front-solicitudes';
  pantallaActual: string = 'estudiante'; 

  cambiarPantalla(pantalla: string) {
    this.pantallaActual = pantalla;
  }
}
