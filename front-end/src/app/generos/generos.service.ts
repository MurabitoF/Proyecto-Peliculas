import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneroCreacionDTO, GeneroDTO } from './genero';

@Injectable({
  providedIn: 'root',
})
export class GenerosService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + 'generos';

  public obtenerPaginado(pagina: number, cantidadElementosAMostrar: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadElementosAMostrar.toString()
    );
    return this.http.get<GeneroDTO[]>(this.apiURL, {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos(): Observable<GeneroDTO[]> {
    return this.http.get<GeneroDTO[]>(`${this.apiURL}/todos`);
  }

  public obtenerPorId(id: number): Observable<GeneroDTO> {
    return this.http.get<GeneroDTO>(`${this.apiURL}/${id}`);
  }

  public crear(genero: GeneroCreacionDTO) {
    return this.http.post(this.apiURL, genero);
  }

  public editar(id: number, genero: GeneroCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, genero);
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
