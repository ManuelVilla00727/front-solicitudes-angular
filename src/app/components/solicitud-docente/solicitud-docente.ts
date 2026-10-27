import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-docente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './solicitud-docente.html',
  styleUrls: ['./solicitud-docente.css']
})
export class SolicitudDocenteComponent {

  calificacion = {
    idSolicitud: 4, // Pon el ID que te salió en verde (4)
    notaEvaluacion: 10.00,
    comentario: 'Excelente evaluación de recuperación'
  };

  cargando = false;
  mensajeExito = '';
  mensajeError = '';
  notaFinal: number | null = null;

  private apiUrl = 'http://ms-solicitudes-env-v1.eba-ep3zt4un.us-east-1.elasticbeanstalk.com/api/solicitudes';

  constructor(private http: HttpClient) {}

  calificarSolicitud() {
    this.cargando = true;
    this.mensajeExito = '';
    this.mensajeError = '';
    this.notaFinal = null;

    this.http.put(`${this.apiUrl}/${this.calificacion.idSolicitud}/calificar`, this.calificacion).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;
        this.notaFinal = respuesta.notaNuevaPropuesta;
        this.mensajeExito = 'Solicitud calificada correctamente.';
      },
      error: (error) => {
        this.cargando = false;
        if (error.error && error.error.error) {
          this.mensajeError = error.error.error;
        } else {
          this.mensajeError = 'Error al conectar con el servidor.';
        }
      }
    });
  }
}
