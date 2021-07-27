import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input()
  pelicula: PeliculaDTO;

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  actoresSeleccionados: ActorPeliculaDTO[] = [];
  
  @Input()
  generosNoSeleccionados: MultipleSelectorModel[];

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[];
  
  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];

  imagenCambiada: boolean = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    if (this.pelicula !== undefined) {
      this.form.patchValue(this.pelicula);
    }
  }

  guardarCambios() {
    console.log(this.generosSeleccionados);
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosIds);
    this.form.get('cinesIds').setValue(cinesIds);
    const actores = this.actoresSeleccionados.map(val => 
      {
        return { id: val.id, personaje: val.personaje};
      });
      this.form.get('actores').setValue(actores);

      if(!this.imagenCambiada){
        this.form.patchValue({'poster': null});
      }
    this.OnSubmit.emit(this.form.value);
  }

  registroResumen(texto: string) {
    this.form.get('resumen').setValue(texto);
  }

  archivoSeleccionado(poster: File) {
    this.form.get('poster').setValue(poster);
    this.imagenCambiada = true;
  }
}
