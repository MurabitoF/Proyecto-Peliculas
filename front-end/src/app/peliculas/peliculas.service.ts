import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGet, PeliculaPutGet } from './peliculas';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'peliculas';

  public obtenerLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(this.apiURL);
  }

  public postGet(): Observable<PeliculaPostGet> {
    return this.http.get<PeliculaPostGet>(`${this.apiURL}/postget`);
  }

  public putGet(id: number): Observable<PeliculaPutGet>{
    return this.http.get<PeliculaPutGet>(`${this.apiURL}/putget/${id}`);
  }

  public obtenerPorId(id: number): Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(`${this.apiURL}/${id}`);
  }

  public filtrar(valores: any): Observable<any>{
    const params = new HttpParams({fromObject: valores});
    return this.http.get<PeliculaDTO[]>(`${this.apiURL}/filtrar`, {params, observe: 'response'});
  }

  public crear(peliculaCreacionDTO: PeliculaCreacionDTO): Observable<number> {
    const formData = this.construirFormData(peliculaCreacionDTO);
    return this.http.post<number>(this.apiURL, formData);
  }

  public editar(id: number, pelicula: PeliculaCreacionDTO) {
    const formData = this.construirFormData(pelicula);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  private construirFormData(peliculaCreacionDTO: PeliculaCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('titulo', peliculaCreacionDTO.titulo);
    if (peliculaCreacionDTO.resumen) {
      formData.append('resumen', peliculaCreacionDTO.resumen);
    }
    if (peliculaCreacionDTO.enCines) {
      formData.append('enCines', String(peliculaCreacionDTO.enCines));
    }
    if (peliculaCreacionDTO.resumen) {
      formData.append('trailer', peliculaCreacionDTO.trailer);
    }
    if (peliculaCreacionDTO.fechaLanzamiento) {
      formData.append('fechaLanzamiento', formatearFecha(peliculaCreacionDTO.fechaLanzamiento));
    }
    if (peliculaCreacionDTO.poster) {
      formData.append('poster', peliculaCreacionDTO.poster);
    }
    if (peliculaCreacionDTO.generosIds) {
      formData.append(
        'generosIds',
        JSON.stringify(peliculaCreacionDTO.generosIds)
      );
    }
    if (peliculaCreacionDTO.cinesIds) {
      formData.append('cinesIds', JSON.stringify(peliculaCreacionDTO.cinesIds));
    }
    if (peliculaCreacionDTO.actores) {
      formData.append('actores', JSON.stringify(peliculaCreacionDTO.actores));
    }
    return formData;
  }
}
