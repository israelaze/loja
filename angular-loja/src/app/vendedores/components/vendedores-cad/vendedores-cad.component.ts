import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/util/services/alert.service';
import { Vendedor } from '../../models/vendedor';
import { VendedoresService } from './../../services/vendedores.service';

@Component({
  selector: 'app-vendedores-cad',
  templateUrl: './vendedores-cad.component.html',
  styleUrls: ['./vendedores-cad.component.scss']
})
export class VendedoresCadComponent {

  constructor(private formBuilder: FormBuilder,
    private vendedoresService: VendedoresService,
    private alertService: AlertService,
    private router: Router){}



  form = this.formBuilder.group({
    nome: ['', Validators.required],
    apelido: ['']
  });

  cadastrar(){

    const vendedor: Vendedor = this.populaDadosForm();
    console.log();


    this.vendedoresService.cadastrar(vendedor).subscribe({
      next: result => {
        this.onSuccess(result);
      },
      error: e => {
        this.onError(e);
      }
    });
  }

  private onSuccess(result: Vendedor) {
    this.alertService.success('Vendedor ' + result.nome+ ' cadastrado(a) com sucesso');
    this.router.navigate(['vendedores/vendedores-lista/']);
  }

  private onError(e: any) {


    console.log(e.error.errors[0].message);

    this.alertService.error(e.error.message + ': ' + e.error.errors[0].message);
  }

  populaDadosForm(): Vendedor{
    return {
      nome: this.form.value.nome,
      apelido: this.form.value.apelido
    };
  }

  getErrorMessage(fieldName: string){

    const form = this.form.get(fieldName);

    if(form?.hasError('required')){
      return 'Campo obrigatório'
    }

    return 'Inválido';
  }

}
