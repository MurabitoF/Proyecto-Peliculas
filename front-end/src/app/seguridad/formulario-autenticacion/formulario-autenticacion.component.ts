import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css'],
})
export class FormularioAutenticacionComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  accion: string;

  @Output()
  onSubmit: EventEmitter<CredencialesUsuario> = new EventEmitter<CredencialesUsuario>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  obtenerMensajeErrorEmail(){
    let campo = this.form.get('email');
     if(campo.hasError('required')){
       return 'El campo es requerido';
     }
     if(campo.hasError('email')){
       return 'El email no es valido';
     }
     return '';
  }
}
