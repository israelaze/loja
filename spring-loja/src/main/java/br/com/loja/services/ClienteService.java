package br.com.loja.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import br.com.loja.dtos.cliente.ClienteGetDTO;
import br.com.loja.dtos.cliente.ClientePostDTO;
import br.com.loja.dtos.cliente.ClientePutDTO;
import br.com.loja.dtos.endereco.EnderecoDTO;
import br.com.loja.entities.Cliente;
import br.com.loja.entities.Endereco;
import br.com.loja.exceptions.BadRequestException;
import br.com.loja.exceptions.ConstraintViolationException;
import br.com.loja.exceptions.EntityNotFoundException;
import br.com.loja.reflections.EnderecoReflection;
import br.com.loja.repositories.ClienteRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ClienteService {

	private final ClienteRepository clienteRepository;
	private final EnderecoService enderecoService;
	private final ModelMapper mapper;

	public ClienteGetDTO cadastrar(ClientePostDTO dto) throws IllegalArgumentException, IllegalAccessException {

		// verificar se o CPF já está cadastrado
		Optional<Cliente> result = clienteRepository.findByCpf(dto.getCpf());
		if (result.isPresent()) {
			throw new BadRequestException("O CPF informado já encontra-se cadastrado. Tente outro.");
		}
		
		// verificar se o telefone1 já está cadastrado
		Optional<Cliente> result2 = clienteRepository.findByTelefone1(dto.getTelefone1());
		if (result2.isPresent()) {
			throw new BadRequestException("O telefone principal informado já encontra-se cadastrado. Tente outro.");
		}
		
		// convertendo o endereço do cliente(dto) para um enderecoDTO
		EnderecoDTO enderecoDTO = mapper.map(dto, EnderecoDTO.class);
				
		// verificando se existem campos preenchidos 
		EnderecoReflection endReflection = new EnderecoReflection();
		boolean result3 = endReflection.reflection(enderecoDTO);

		Endereco endereco = new Endereco();
		// caso exista(TRUE)
		if (result3) {
			// cadastrando um endereço
			endereco = enderecoService.cadastrar(enderecoDTO);
		}
		
		// cadastrando novo Cliente com ou sem endereço
		Cliente cliente = mapper.map(dto, Cliente.class);
		if (endereco.getIdEndereco() != null) {
			cliente.setEndereco(endereco);
		}
		
		clienteRepository.save(cliente);

		// convertendo o cliente em dto e retornando ao cotroller
		return new ClienteGetDTO(cliente);
	}

	public List<ClienteGetDTO> buscarClientes() {

		List<Cliente> list = clienteRepository.findAll();
		List<ClienteGetDTO> listaGetDto = new ArrayList<ClienteGetDTO>();

		for (Cliente cliente : list) {
			ClienteGetDTO getDto = new ClienteGetDTO(cliente);

			listaGetDto.add(getDto);
		}

		return listaGetDto;
	}

	public ClienteGetDTO buscarId(Integer idCliente) {

		Optional<Cliente> result = clienteRepository.findById(idCliente);

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Cliente não encontrado.");
		}

		Cliente cliente = result.get();

		return new ClienteGetDTO(cliente);
	}

	public ClienteGetDTO atualizar(ClientePutDTO dto) {

		Optional<Cliente> result = clienteRepository.findById(dto.getIdCliente());

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Cliente não encontrado.");
		}
		
		// convertendo o endereço do cliente(dto) para um EnderecoDTO
		EnderecoDTO enderecoDto = mapper.map(dto, EnderecoDTO.class);
		
		// verificando se existem campos preenchidos em enderecoDto
		EnderecoReflection endReflection = new EnderecoReflection();
		boolean result2 = endReflection.reflection(enderecoDto);
		
		// atualizando os dados do cliente
		Cliente cliente = result.get();
		mapper.map(dto, cliente);

		// SITUAÇÃO 1: caso o cliente não possua endereço
		if(cliente.getEndereco() == null) {
			// se result2 = TRUE
			if (result2) {
				// cadastrar novo endereço para o cliente
				Endereco endereco = enderecoService.cadastrar(enderecoDto);
				cliente.setEndereco(endereco);
			}
		
			clienteRepository.save(cliente);
			
			return new ClienteGetDTO(cliente);
		}
		
		// SITUAÇÃO 2: caso o cliente já possua endereço
		if (!result2) {
			// se result2 = FALSE
			throw new BadRequestException("Prencha pelo menos um campo de endereço.");
		}
		
		// atualizando endereço do cliente
		enderecoDto.setIdEndereco(cliente.getEndereco().getIdEndereco());
		enderecoService.atualizar(enderecoDto);
		
		clienteRepository.save(cliente);

		return new ClienteGetDTO(cliente);
	}

	public String excluir(Integer idCliente) {

		Optional<Cliente> result = clienteRepository.findById(idCliente);

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Cliente não encontrado.");
		}

		Cliente cliente = result.get();

		// buscando uma lista de clientes associados ao endereço fornecido(ManyToOne)
		if (cliente.getEndereco() != null) {

			Optional<List<Cliente>> result2 = clienteRepository
					.findByIdEnderecoJoinEndereco(cliente.getEndereco().getIdEndereco());
			List<Cliente> lista = result2.get();

			// excluindo o endereço caso ele pertença apenas ao cliente
			if (lista.size() == 1) {
				enderecoService.excluir(cliente.getEndereco().getIdEndereco());
			}
		}

		// verificando se o cliente possui pedido(caso possua, não será permitido a sua exclusão)
		if (cliente.getPedidos().size() > 0) {
			throw new ConstraintViolationException("Não é possível excluir o(a) cliente " + cliente.getNome()
					+ " pois ele(a) possui um ou mais pedidos cadastrados.");

		} else {
			clienteRepository.delete(cliente);
			return "Cliente " + cliente.getNome() + " excluído com sucesso.";
		}

	}

}
