import { Cliente } from 'src/app/clientes/models/cliente';
import { ItemPedido } from "./itemPedido";

export class Pedido{
  idPedido?: number;
	numeroPedido: string;
	dataPedido: string;
	dataEntrega: string;
	situacao: string;
	desconto: number;
	total: number;
  itens: ItemPedido[] = [];
  cliente: Cliente = new Cliente;

}
