import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { CredencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private seguridadService: SeguridadService, private router: Router) { }

  errores: string[] = [];

  ngOnInit(): void {
  }

  registrarUsuario(credenciales: CredencialesUsuario){
    this.seguridadService.registrar(credenciales).subscribe(respuesta => {
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/']);
    }, error => this.errores = parsearErroresAPI(error));
  }

}
