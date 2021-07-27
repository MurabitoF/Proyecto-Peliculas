import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../peliculas/peliculas';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private peliculasService: PeliculasService) {}

  listaPeliculasCine: PeliculaDTO[] = [];
  listaPeliculasEstrenar: PeliculaDTO[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(){
    this.peliculasService.obtenerLandingPage().subscribe((landingPage) => {
      this.listaPeliculasCine = landingPage.enCines;
      this.listaPeliculasEstrenar = landingPage.proximosEstrenos;
    });
  }

  borrado(){
    this.cargarDatos();
  }
}
