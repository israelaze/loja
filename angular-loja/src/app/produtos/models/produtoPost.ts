import { Fornecedor } from "src/app/fornecedores/models/fornecedor";

export class ProdutoPost {

	nomeProduto: string;
	descricao: string;
	ativo?: boolean;
	peso?: string;
	valorCusto?: string;
	valorVenda?: string;
  foto?: string;
	idFornecedor: string;

}
