import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.component.html',
  styleUrls: ['./produto-detalhes.component.scss']
})
export class ProdutoDetalhesComponent implements OnInit{

  constructor( private produtoService: ProdutosService,
    private snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute
  ){}

  //atributo para guardar o parâmetro recebido na rota
  parametro = this.route.snapshot.paramMap.get('id');
  produto: Produto = new Produto;
  ativo: string = '';


  ngOnInit(): void {
    //converter STRING => NUMBER.
     this.produto.idProduto = this.converterStringToNumber(this.parametro);

    this.buscarProduto(this.produto.idProduto);
  }

  buscarProduto(idProduto: number){

    this.produtoService.buscarId(idProduto).subscribe({
      next: result => {
        this.produto = result;

        console.log(this.produto.tipoPeso);

        if(result.ativo == false){
          this.ativo = 'NÃO';
        }else{
          this.ativo = 'SIM';
        }


        if(this.produto.foto){
          this.produto.foto = 'data:image/jpeg;base64,' +this.produto.foto;
        }
      },
      error: e => {
      //  this.router.navigate(['produtos/produtos-lista']);

        const msg: string = e.error.message;
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    });
  }

  editar(): void{

  }

  voltar(): void{
    history.go(-1);
  }

  /* ---------------------- C O N V E R S O R E S  ----------------------*/

  converterStringToNumber(parametro: string): number {
    return +parametro;
  }

  converterJsonToObjeto(json: string): any{
    return JSON.parse(json);
  }

  converterObjetoToJson(objeto: any): string{
    return JSON.stringify(objeto);
  }


}
