import { ItemPedidoPost } from './itemPedidoPost';

export class PedidoPost{
  idCliente: number;
  idVendedor: number;
  situacao: string;
  desconto: number;
  itens: ItemPedidoPost[] = [];

}



