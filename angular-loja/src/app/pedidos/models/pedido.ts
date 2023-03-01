import { ItemPedido } from "./itemPedido";

export class Pedido{
  idPedido?: number;
	numeroPedido: string;
	dataPedido: string;
	dataEntrega: string;
	situacao: string;
	desconto: string;
	total: string;
  itens: ItemPedido[] = [];

}
