import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from './../../services/usuarios.service';
import { AlertService } from 'src/app/util/services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-cad',
  templateUrl: './usuarios-cad.component.html',
  styleUrls: ['./usuarios-cad.component.scss']
})
export class UsuariosCadComponent implements OnInit {

  ngOnInit(): void {
  }

  usuarioPost: Usuario = new Usuario;

  registerForm = this.fb.nonNullable.group(
    {
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmSenha: ['', [Validators.required]],
    },
    {
      validators: [this.matchValidator('senha', 'confirmSenha')],
    }
  );

  constructor(private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private alertService: AlertService,
    private router: Router) {}

  matchValidator(source: string, target: string) {

    console.log(this.registerForm);

    console.log(source);
    console.log(target);
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }

  cadastrar(){

    this.populaDadosForm();

    this.usuariosService.cadastrar(this.usuarioPost).subscribe({
      next: result => {
        this.onSuccess(result);
      },
      error: e => {
        this.onError(e)
      }
    });
  }

  populaDadosForm(): void {
    this.usuarioPost.nome = this.registerForm.value.nome;
    this.usuarioPost.email = this.registerForm.value.email;
    this.usuarioPost.senha = this.registerForm.value.senha;
  }

  private onSuccess(result: Usuario) {
    this.alertService.success('Usuário ' + result.nome+ ' cadastrado(a) com sucesso');
    this.router.navigate(['login']);
  }

  private onError(e: any) {
    this.alertService.error(e.error.message);
  }


}
