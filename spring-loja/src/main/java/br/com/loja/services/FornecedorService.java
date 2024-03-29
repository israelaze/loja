package br.com.loja.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import br.com.loja.dtos.endereco.EnderecoDTO;
import br.com.loja.dtos.fornecedor.FornecedorGetDTO;
import br.com.loja.dtos.fornecedor.FornecedorPostDTO;
import br.com.loja.dtos.fornecedor.FornecedorPutDTO;
import br.com.loja.entities.Endereco;
import br.com.loja.entities.Fornecedor;
import br.com.loja.entities.Produto;
import br.com.loja.exceptions.BadRequestException;
import br.com.loja.exceptions.EntityNotFoundException;
import br.com.loja.reflections.EnderecoReflection;
import br.com.loja.repositories.EnderecoRepository;
import br.com.loja.repositories.FornecedorRepository;
import br.com.loja.repositories.ProdutoRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FornecedorService {

	private final ModelMapper mapper;
	private final EnderecoService enderecoService;
	private final EnderecoRepository endRepository;
	private final FornecedorRepository fornecedorRepository;
	private final ProdutoRepository produtoRepository;

	// CADASTRAR
	public FornecedorGetDTO cadastrar(FornecedorPostDTO dto) {

		List<Fornecedor> lista = fornecedorRepository.findAll();

		Fornecedor result = mapper.map(dto, Fornecedor.class);

		for (Fornecedor result2 : lista) {
			if (result.equals(result2)) {
				if (result.getCpfCnpj().equalsIgnoreCase(result2.getCpfCnpj())) {
					throw new BadRequestException("cpf ou cnpj já cadastrado.");
				} else if (result.getTelefone1().equalsIgnoreCase(result2.getTelefone1())) {
					throw new BadRequestException("telefone1 já cadastrado.");
				} else if (result.getTelefone2() != null && result.getTelefone2().equalsIgnoreCase(result2.getTelefone2())) {
					throw new BadRequestException("telefone2 já cadastrado.");
				} else if (result.getEmail() != null && result.getEmail().equalsIgnoreCase(result2.getEmail())) {
					throw new BadRequestException("email já cadastrado.");
				}
			}
		}

		// convertendo os campos referente à endereço para um enderecoDTO
		EnderecoDTO enderecoDTO = mapper.map(dto, EnderecoDTO.class);

		// verificando se existem campos NÃO nulos em enderecoDTO
		EnderecoReflection endReflection = new EnderecoReflection();
		boolean result3 = endReflection.reflection(enderecoDTO);

		Endereco endereco = new Endereco();
		// caso exista
		if (result3) {

			// buscando um endereço existente no banco
			Optional<Endereco> result4 = endRepository.findByLogradouroAndNumeroAndCepAndComplemento(
					dto.getLogradouro(), dto.getNumero(), dto.getCep(), dto.getComplemento());

			if (result4.isPresent()) {
				throw new BadRequestException(" Endereço já cadastrado.");
			}
			// cadastrando um endereço
			endereco = enderecoService.cadastrar(enderecoDTO);
		}

		// Cadastrando novo Fornecedor
		Fornecedor fornecedor = mapper.map(dto, Fornecedor.class);
		if (endereco.getIdEndereco() != null) {
			fornecedor.setEndereco(endereco);
		}
		fornecedorRepository.save(fornecedor);

		// convertendo o fornecedor em dto e retornando ao cotroller
		return new FornecedorGetDTO(fornecedor);
	}

	// BUSCAR TODOS OS FORNECEDORES
	public List<FornecedorGetDTO> buscarFornecedores() {

		List<Fornecedor> list = fornecedorRepository.findAll();
		List<FornecedorGetDTO> listaGetDto = new ArrayList<FornecedorGetDTO>();

		for (Fornecedor fornecedor : list) {
			FornecedorGetDTO getDto = new FornecedorGetDTO(fornecedor);

			listaGetDto.add(getDto);
		}

		return listaGetDto;
	}

	// BUSCAR UM FORNECEDOR
	public FornecedorGetDTO buscarId(Integer idFornecedor) {

		Optional<Fornecedor> result = fornecedorRepository.findById(idFornecedor);

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Fornecedor não encontrado.");
		}

		Fornecedor fornecedor = result.get();

		return new FornecedorGetDTO(fornecedor);

	}

	// ATUALIZAR UM FORNECEDOR
	public FornecedorGetDTO atualizar(FornecedorPutDTO dto) {

		Optional<Fornecedor> result = fornecedorRepository.findById(dto.getIdFornecedor());

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Fornecedor não encontrado.");
		}

		// convertendo o endereço do Fornecedor para um enderecoDTO
		EnderecoDTO enderecoDto = mapper.map(dto, EnderecoDTO.class);

		// verificando se existem campos NÃO nulos em enderecoDTO
		EnderecoReflection endReflection = new EnderecoReflection();
		boolean result2 = endReflection.reflection(enderecoDto);

		// atualizando os dados do Fornecedor encontrado
		Fornecedor fornecedor = result.get();
		mapper.map(dto, fornecedor);

		// SITUAÇÃO 1: caso o fornecedor não possua endereço
		if (fornecedor.getEndereco() == null) {
			// se result2 = TRUE
			if (result2) {
				// cadastrar novo endereço para o fornecedor
				Endereco endereco = enderecoService.cadastrar(enderecoDto);
				fornecedor.setEndereco(endereco);
			}

			fornecedorRepository.save(fornecedor);

			return new FornecedorGetDTO(fornecedor);
		}

		// SITUAÇÃO 2: caso o fornecedor já possua endereço
		if (!result2) {
			// se result2 = FALSE
			throw new BadRequestException("Prencha pelo menos um campo de endereço.");
		}

		// atualizando endereço do fornecedor
		enderecoDto.setIdEndereco(fornecedor.getEndereco().getIdEndereco());
		enderecoService.atualizar(enderecoDto);

		fornecedorRepository.save(fornecedor);

		return new FornecedorGetDTO(fornecedor);
	}

	// EXCLUIR UM FORNECEDOR
	public String excluir(Integer idFornecedor) {

		Optional<Fornecedor> result = fornecedorRepository.findById(idFornecedor);

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Fornecedor não encontrado.");
		}

		Fornecedor fornecedor = result.get();
		Set<Produto> produtos = fornecedor.getProdutos();

		// ATENÇÃO - Esse método exclui toda a coleção de produtos do Fornecedor
		if (produtos.size() >= 1) {
			produtoRepository.deleteAllInBatch(produtos);
		}

		// Excluindo o endereço do Fornecedor
		if (fornecedor.getEndereco() != null) {
			enderecoService.excluir(fornecedor.getEndereco().getIdEndereco());
		}

		// Excluindo o Fornecedor
		fornecedorRepository.delete(fornecedor);
		return "Fornecedor " + result.get().getNomeFornecedor() + " excluído com sucesso.";
	}

}
