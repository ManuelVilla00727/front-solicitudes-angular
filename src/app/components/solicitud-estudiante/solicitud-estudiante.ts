import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-estudiante',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './solicitud-estudiante.html',
  styleUrls: ['./solicitud-estudiante.css']
})
export class SolicitudEstudianteComponent {
  
  // Objeto con todos los campos, incluyendo los nuevos
  solicitud = {
    estudianteId: 1,
    asignaturaId: 101,
    actividadId: 201,               // <-- NUEVO CAMPO
    notaOriginal: 5.50,
    actividadRecuperar: '',         // Nombre de la actividad
    rutaArchivoSolicitud: ''
  };

  cargando = false;
  mensajeExito = '';
  mensajeError = '';
  nombreArchivo = '';

  // URL de tu microservicio en la nube (AWS Elastic Beanstalk)
  private apiUrl = 'http://ms-solicitudes-env-v1.eba-ep3zt4un.us-east-1.elasticbeanstalk.com/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Método para capturar el archivo seleccionado
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.nombreArchivo = file.name;
      // Simulamos la subida guardando el nombre del archivo.
      // En producción, aquí subiríamos el archivo a AWS S3.
      this.solicitud.rutaArchivoSolicitud = this.nombreArchivo;
    }
  }

  // Método para enviar la solicitud al backend
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
        if (error.error && error.error.error) {
          this.mensajeError = error.error.error;
        } else {
          this.mensajeError = 'Error al conectar con el servidor.';
        }
      }
    });
  }
}