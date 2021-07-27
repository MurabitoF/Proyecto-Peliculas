import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { CineCreacionDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css'],
})
export class CrearCineComponent {
  constructor(private router: Router, private cinesService: CinesService) {}

  errores: string[] = [];

  guardarCambios(cine: CineCreacionDTO) {
    this.cinesService.crear(cine).subscribe(
      () => {
        this.router.navigate(['/cines']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
