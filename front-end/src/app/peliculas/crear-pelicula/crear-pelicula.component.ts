import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculaCreacionDTO } from '../peliculas';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  constructor(
    private router: Router,
    private peliculasService: PeliculasService
  ) {}

  errores: string[] = [];

  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(
      (resultado) => {
        this.generosNoSeleccionados = resultado.generos.map((genero) => {
          return <MultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombre,
          };
        });

        this.cinesNoSeleccionados = resultado.cines.map((cine) => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre,
          };
        });
      },
      (error) => console.error(error)
    );
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.crear(pelicula).subscribe(
      (id: number) => this.router.navigate(['/peliculas/' + id]),
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}