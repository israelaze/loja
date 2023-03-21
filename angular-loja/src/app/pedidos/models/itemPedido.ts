import { Produto } from "src/app/produtos/models/produto";

export class ItemPedido{
  quantidade: number = 0;
	preco: number = 0.0;
	subTotal: number = 0.0;
	produto: Produto = new Produto;
}
