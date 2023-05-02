import { Fornecedor } from "src/app/fornecedores/models/fornecedor";

export class Produto {

  idProduto?: number;
	nomeProduto?: string;
	codigo?: string;
	descricao?: string;
  categoria?: string;
	dataCadastro?: string;
	ativo?: boolean;
	peso: string;
  tipoPeso: string;
	valorCusto?: number;
	valorVenda?: number;
  foto?: string;
	margemLucro?: number;
	fornecedor?: Fornecedor = new Fornecedor;

}
