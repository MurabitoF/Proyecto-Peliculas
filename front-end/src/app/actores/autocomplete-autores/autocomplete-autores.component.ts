import {
  CdkDragDrop,
  CdkDragSortEvent,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { ActorPeliculaDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-autocomplete-autores',
  templateUrl: './autocomplete-autores.component.html',
  styleUrls: ['./autocomplete-autores.component.css'],
})
export class AutocompleteAutoresComponent implements OnInit {
  constructor(private actoresService: ActoresService) {}

  actoresControl: FormControl = new FormControl();

  @Input()
  actoresSeleccionados: ActorPeliculaDTO[] = [];

  actoresAMostrar: ActorPeliculaDTO[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.actoresControl.valueChanges.subscribe((nombre) => {
      this.actoresService.obtenerPorNombre(nombre).subscribe(actores => 
        {
          this.actoresAMostrar = actores;
        });
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.actoresControl.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  eliminar(actor) {
    const actorIndex = this.actoresSeleccionados.findIndex(
      (a) => a.nombre === actor.nombre
    );
    this.actoresSeleccionados.splice(actorIndex, 1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.actoresSeleccionados,
      event.previousIndex,
      event.currentIndex
    );
    this.table.renderRows();
  }
}
