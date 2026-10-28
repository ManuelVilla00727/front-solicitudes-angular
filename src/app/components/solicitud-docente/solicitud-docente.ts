import { Component, OnInit } from '@angular/core';
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
export class SolicitudDocenteComponent implements OnInit {

  // Arreglo que guardará la lista de solicitudes pendientes
  solicitudes: any[] = [];
  
  // Variable para saber qué solicitud se está calificando
  solicitudSeleccionada: any = null;
  
  // Objeto con los datos de la calificación
  calificacion = {
    notaEvaluacion: 10.00,
    comentario: 'Evaluación revisada'
  };

  cargando = false;
  mensajeExito = '';
  mensajeError = '';
  notaFinal: number | null = null;

  // URL de tu microservicio en AWS Elastic Beanstalk
  private apiUrl = 'http://ms-solicitudes-env-v1.eba-ep3zt4un.us-east-1.elasticbeanstalk.com/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Se ejecuta al cargar el componente
  ngOnInit() {
    this.cargarPendientes();
  }

  // 1. Obtener la lista de solicitudes pendientes desde AWS
  cargarPendientes() {
    this.http.get<any[]>(`${this.apiUrl}/pendientes`).subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (err) => {
        console.error('Error al cargar pendientes:', err);
      }
    });
  }

  // 2. Seleccionar una solicitud de la tabla para calificarla
  abrirCalificacion(solicitud: any) {
    this.solicitudSeleccionada = solicitud;
    this.mensajeExito = '';
    this.mensajeError = '';
    this.notaFinal = null;
  }

  // 3. Enviar la calificación al backend
  calificarSolicitud() {
    if (!this.solicitudSeleccionada) return;
    
    this.cargando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.http.put(`${this.apiUrl}/${this.solicitudSeleccionada.id}/calificar`, this.calificacion).subscribe({
      next: (respuesta: any) => {
        this.cargando = false;
        this.notaFinal = respuesta.notaNuevaPropuesta;
        this.mensajeExito = 'Solicitud calificada correctamente.';
        
        // Refrescamos la tabla y cerramos el panel de calificación
        this.cargarPendientes(); 
        this.solicitudSeleccionada = null;
      },
      error: (error) => {
        this.cargando = false;
        this.mensajeError = error.error?.error || 'Error al conectar con el servidor.';
      }
    });
  }
}