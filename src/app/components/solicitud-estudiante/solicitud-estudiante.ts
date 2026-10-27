import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-estudiante',
  standalone: true,
  imports: [FormsModule, CommonModule], // Importante para formularios y *ngIf
  templateUrl: './solicitud-estudiante.html',
  styleUrls: ['./solicitud-estudiante.css']
})
export class SolicitudEstudianteComponent {
  
  // Objeto que se envía al backend
  solicitud = {
    estudianteId: 1,
    asignaturaId: 101,
    notaOriginal: 5.50
  };

  cargando = false;
  mensajeExito = '';
  mensajeError = '';

  // URL de tu microservicio en Java (Spring Boot)
private apiUrl = 'http://ms-solicitudes-env-v1.eba-ep3zt4un.us-east-1.elasticbeanstalk.com/api/solicitudes';

  constructor(private http: HttpClient) {}

  crearSolicitud() {
    this.cargando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.http.post(this.apiUrl, this.solicitud).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;
        this.mensajeExito = `Solicitud creada con éxito. ID: ${respuesta.id}. Estado: PENDIENTE.`;
      },
      error: (error) => {
        this.cargando = false;
        // Aquí capturamos los errores de límites o rangos del Ministerio
        if (error.error && error.error.error) {
          this.mensajeError = error.error.error;
        } else {
          this.mensajeError = 'Error al conectar con el servidor.';
        }
      }
    });
  }
}
