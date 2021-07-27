import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css'],
})
export class InputMarkdownComponent implements OnInit {
  constructor() {}

  @Input()
  placeHolderTextArea: string = 'Texto';
  
  @Input()
  contenidoMarkDown: string = '';
  
  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(): void {

  }

  guardarCambios(evento){
    const texto = evento.target.value;
    this.contenidoMarkDown = texto;
    this.changeMarkdown.emit(texto);
  }
}
