import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDTO } from '../peliculas';
import { GeneroDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService
  ) {}

  form: FormGroup;

    paginaActual = 1;
    cantidadElementosPorPagina = 14;
    cantidadElementos;

  generos: GeneroDTO[] = [];

  peliculas: PeliculaDTO[];

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.generosService.obtenerTodos().subscribe((generos) => {
      this.generos = generos;

      this.form = this.formBuilder.group(this.formularioOriginal);
      this.leerValoresURL();
      this.buscarPeliculas(this.form.value);

      this.form.valueChanges.subscribe((valores) => {
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      });
    });
  }

  private leerValoresURL(): any {
    this.activatedRoute.queryParams.subscribe((params) => {
      let filtro: any = {};

      if (params.titulo) {
        filtro.titulo = params.titulo;
        console.log(filtro.titulo);
      }
      if (params.generoId) {
        filtro.generoId = Number(params.generoId);
      }
      if (params.proximosEstrenos) {
        filtro.proximosEstrenos = params.proximosEstrenos;
      }
      if (params.enCines) {
        filtro.enCines = params.enCines;
      }

      this.form.patchValue(filtro);
    });
  }

  private escribirParametrosBusquedaEnURL() {
    let queryStrings = [];

    let valoresFormulario = this.form.value;
    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo= ${valoresFormulario.titulo}`);
    }
    if (valoresFormulario.generoId != '0') {
      queryStrings.push(`generoId= ${valoresFormulario.generoId}`);
    }
    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(
        `proximosEstrenos= ${valoresFormulario.proximosEstrenos}`
      );
    }
    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines= ${valoresFormulario.enCines}`);
    }
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarPeliculas(valores: any) {
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosPorPagina;
    this.peliculasService.filtrar(valores).subscribe(response => {
      this.peliculas = response.body;
      this.escribirParametrosBusquedaEnURL();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    })
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosPorPagina = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

  limpiarFiltro(): void {
    this.form.patchValue(this.formularioOriginal);
  }

  borrado(){
    this.cargarDatos();
  }
}
