import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { GeneroCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css'],
})
export class FormularioGeneroComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  modelo: GeneroCreacionDTO;

  @Output()
  onSubmit: EventEmitter<GeneroCreacionDTO> = new EventEmitter<GeneroCreacionDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            primeraLetraMayuscula(),
          ],
        },
      ],
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios() {
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre(): string {
    let campo: any = this.form.get('nombre');
    if (campo.hasError('required')) {
      return 'El campo Nombre es requerido';
    }
    if (campo.hasError('minlength')) {
      return 'La longitud minima es de 3 caracteres';
    }
    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }
}
