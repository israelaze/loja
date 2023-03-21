import { ItemPedidoPost } from './itemPedidoPost';

export class PedidoPost{
  idCliente: number;
  idVendedor: number;
  situacao: string;
  desconto: number = 0.0;
  itens: ItemPedidoPost[] = [];

}



