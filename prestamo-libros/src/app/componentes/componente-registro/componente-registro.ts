import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionarUsuarios } from '../../servicios/gestionar-usuarios';
import { ErrorService } from '../../servicios/error.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-componente-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './componente-registro.html',
  styleUrl: './componente-registro.css'
})
export class ComponenteRegistro {
  private gestionarUsuarios = inject(GestionarUsuarios);
  private router = inject(Router);
  private errorService = inject(ErrorService);

  registroForm: FormGroup;
  error = '';
  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(5)]],
      clave: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')
        ]
      ],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.registroForm.valid) {
      this.gestionarUsuarios.registro(this.registroForm.get('codigo')?.value,
                                      this.registroForm.get('clave')?.value,
                                      this.registroForm.get('nombre')?.value,
                                      this.registroForm.get('email')?.value)
          .subscribe({
        next: () => {
          this.error = '';
          this.errorService.limpiarErrores();
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.error = this.errorService.manejarError(err);
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registroForm.controls;
  }
}
