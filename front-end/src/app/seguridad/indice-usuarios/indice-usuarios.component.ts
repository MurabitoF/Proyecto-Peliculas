import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { UsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css'],
})
export class IndiceUsuariosComponent implements OnInit {
  constructor(private seguridadService: SeguridadService) {}

  usuarios: UsuarioDTO[];
  columnasAMostrar: string[] = ['email', 'acciones'];

  paginaActual: number = 1;
  cantidadRegistrosAMostrar: number = 10;
  cantidadTotalRegistros;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number) {
    this.seguridadService
      .obtenerUsuarios(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<UsuarioDTO[]>) => {
          this.usuarios = respuesta.body;
          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.error(error)
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  hacerAdmin(usuarioId: string){
    this.seguridadService.hacerAdmin(usuarioId).subscribe(() => {
      Swal.fire('Exitoso', 'La operacion fue exitosa', 'success')
    });
  }

  removerAdmin(usuarioId: string){
    this.seguridadService.removerAdmin(usuarioId).subscribe(() => {
      Swal.fire('Exitoso', 'La operacion fue exitosa', 'success');
    });
  }
}
