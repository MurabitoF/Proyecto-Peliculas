import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredencialesUsuario, RespuestaAutenticacion, UsuarioDTO } from './seguridad';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  constructor(private http: HttpClient) {}

  private apiURL: string = environment.apiURL + 'cuentas';

  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';

  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.http.get<UsuarioDTO[]>(`${this.apiURL}/listadousuarios`, {observe: 'response', params});
  }

  hacerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/haceradmin`, JSON.stringify(usuarioId), {headers});
  }

  removerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/removeradmin`, JSON.stringify(usuarioId), {headers});
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    if(!token){
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);
    
    if(expiracionFecha <= new Date()){
      this.logout();
      return false;
    }

    return true;
  }

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.campoRol);
  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);
    if(!token) { return''; }
    let dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  registrar(credenciales: CredencialesUsuario): Observable<RespuestaAutenticacion>{
    return this.http.post<RespuestaAutenticacion>(`${this.apiURL}/crear`, credenciales);
  }
  
  login(credenciales: CredencialesUsuario): Observable<RespuestaAutenticacion>{
    return this.http.post<RespuestaAutenticacion>(`${this.apiURL}/login`, credenciales);
  }

  guardarToken(respuestaAutenticacion: RespuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  obtenerToken(){
    return localStorage.getItem(this.llaveToken);
  }
}
