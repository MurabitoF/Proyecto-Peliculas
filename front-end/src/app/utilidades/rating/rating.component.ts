import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input()
  maximoRating = 5;
  @Input()
  ratingSeleccionado = 0;
  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();
  maximoRatingArr = [];
  votado = false;
  ratingAnterior = 0;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.maximoRatingArr = Array(this.maximoRating).fill(0);
    this.ratingAnterior = this.ratingSeleccionado;
  }

  manejarMouseEnter(index: number): void {
    this.ratingSeleccionado = index + 1;
  }

  manejarMouseLeave(): void {
    this.ratingSeleccionado = this.ratingAnterior;
  }

  rate(index: number): void {
    if (this.seguridadService.estaLogueado()) {
      this.ratingSeleccionado = index + 1;
      this.votado = true;
      this.ratingAnterior = this.ratingSeleccionado;
      this.rated.emit(this.ratingSeleccionado);
    } else {
      Swal.fire(
        'Error',
        'Debe estar logeado para realizar la votacion',
        'error'
      );
    }
  }
}
