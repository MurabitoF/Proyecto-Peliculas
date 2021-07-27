import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { ActorCreacionDTO, ActorDTO, ActorPeliculaDTO } from './actor';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'actores';

  public obtenerTodos(
    pagina: number,
    cantidadElementosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadElementosAMostrar.toString()
    );
    return this.http.get<ActorDTO[]>(this.apiURL, {
      observe: 'response',
      params,
    });
  }

  public obtenerPorId(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerPorNombre(nombre: string): Observable<ActorPeliculaDTO[]>{
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<ActorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre`, JSON.stringify(nombre), {headers});
  }

  public crear(actor: ActorCreacionDTO) {
    const formData = this.construirFormData(actor);

    return this.http.post(this.apiURL, formData);
  }

  public editar(id: number, actor: ActorCreacionDTO) {
    const formData = this.construirFormData(actor);

    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  private construirFormData(actor: ActorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia) {
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento) {
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }

    return formData;
  }
}
