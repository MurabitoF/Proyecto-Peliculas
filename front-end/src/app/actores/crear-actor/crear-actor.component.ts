import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { ActorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent implements OnInit {
  constructor(private router: Router, private actoresService: ActoresService) {}

  ngOnInit(): void {}

  errores: string[] = [];

  guardarCambios(actor: ActorCreacionDTO){
    this.actoresService.crear(actor).subscribe(() => {
      this.router.navigate(['/actores']);
    }, errores => this.errores = parsearErroresAPI(errores));
  }
}
