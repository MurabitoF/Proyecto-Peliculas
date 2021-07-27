import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './MultipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css'],
})
export class SelectorMultipleComponent implements OnInit {
  constructor() {}

  @Input()
  seleccionados: MultipleSelectorModel[] = [];
  
  @Input()
  noSeleccionados: MultipleSelectorModel[] = [];

  ngOnInit(): void {}

  seleccionar(item: MultipleSelectorModel, index: number){
    this.seleccionados.push(item);
    this.noSeleccionados.splice(index,1);
  }
  
  deseleccionar(item: MultipleSelectorModel, index: number){
    this.noSeleccionados.push(item);
    this.seleccionados.splice(index, 1);
  }

  seleccionarTodo() {
    this.seleccionados.push(...this.noSeleccionados);
    this.noSeleccionados = [];
  }

  deseleccionarTodo(){
    this.noSeleccionados.push(...this.seleccionados);
    this.seleccionados = [];
  }
}
