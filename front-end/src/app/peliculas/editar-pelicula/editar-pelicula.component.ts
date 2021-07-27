import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorPeliculaDTO } from 'src/app/actores/actor';
import { CineDTO } from 'src/app/cines/cine';
import { GeneroDTO } from 'src/app/generos/genero';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  constructor(
    private peliculasService: PeliculasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  errores: string[] = [];
  modelo: PeliculaDTO;
  generosSeleccionados: MultipleSelectorModel[];
  generosNoSeleccionados: MultipleSelectorModel[];
  cinesSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: ActorPeliculaDTO[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.peliculasService.putGet(params.id).subscribe((pelicula) => {
        this.modelo = pelicula.pelicula;
        this.generosSeleccionados = pelicula.generosSeleccionados.map(
          (genero) => {
            return <MultipleSelectorModel>{
              llave: genero.id,
              valor: genero.nombre,
            };
          }
        );
        this.generosNoSeleccionados = pelicula.generosNoSeleccionados.map(
          (genero) => {
            return <MultipleSelectorModel>{
              llave: genero.id,
              valor: genero.nombre,
            };
          }
        );
        this.cinesSeleccionados = pelicula.cinesSeleccionados.map((cine) => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre,
          };
        });
        this.cinesNoSeleccionados = pelicula.cinesNoSeleccionados.map(
          (cine) => {
            return <MultipleSelectorModel>{
              llave: cine.id,
              valor: cine.nombre,
            };
          }
        );
        this.actoresSeleccionados = pelicula.actores;
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.editar(this.modelo.id, pelicula).subscribe(
      () => {
        this.router.navigate(['/peliculas/' + this.modelo.id]);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
