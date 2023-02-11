package br.com.loja.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.loja.dtos.usuario.UsuarioGetDTO;
import br.com.loja.dtos.usuario.UsuarioPostDTO;
import br.com.loja.dtos.usuario.UsuarioPutDTO;
import br.com.loja.entities.Usuario;
import br.com.loja.enums.Perfil;
import br.com.loja.exceptions.BadRequestException;
import br.com.loja.exceptions.EntityNotFoundException;
import br.com.loja.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UsuarioService {

	private final UsuarioRepository repository;
	private final ModelMapper mapper;
	private final PasswordEncoder passwordEncoder;

	public UsuarioGetDTO cadastrar(UsuarioPostDTO dto) {

		Optional<Usuario> result = repository.findByEmail(dto.getEmail());

		// verificar se o email já está cadastrado no banco
		if (result.isPresent()) {
			throw new BadRequestException("Erro: Email já cadastrado!");
		}
		
		// inserindo os dados do Usuário
		Usuario usuario = mapper.map(dto, Usuario.class);
		
		// criptografar senha
        String senhaCriptografada =  passwordEncoder.encode(dto.getSenha());
        usuario.setSenha(senhaCriptografada);
        
        // Inserindo perfil de usuário
        usuario.setPerfil(Perfil.USER);
        
		// salvando
		repository.save(usuario);

		// passando o usuário para um dto
		UsuarioGetDTO getDto = new UsuarioGetDTO();
		mapper.map(usuario, getDto);
		return getDto;
	}

	public List<UsuarioGetDTO> buscarUsuarios() {

		List<UsuarioGetDTO> listaGetDto = new ArrayList<UsuarioGetDTO>();
		List<Usuario> listaUsuarios = repository.findAll();

		for (Usuario usuario : listaUsuarios) {

			UsuarioGetDTO getDto = new UsuarioGetDTO();
			mapper.map(usuario, getDto);

			listaGetDto.add(getDto);
		}

		return listaGetDto;
	}

	public UsuarioGetDTO buscarId(Integer idUsuario) {

		Optional<Usuario> result = repository.findById(idUsuario);

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Usuário não encontrado.");
		}

		Usuario usuario = result.get();

		UsuarioGetDTO getDto = new UsuarioGetDTO();
		mapper.map(usuario, getDto);

		return getDto;
	}

	public UsuarioGetDTO atualizar(UsuarioPutDTO dto) {

		Optional<Usuario> result = repository.findById(dto.getIdUsuario());

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Usuário não encontrado.");
		}

		// alterando os dados do Usuário encontrado
		Usuario usuario = result.get();
		mapper.map(dto, usuario);
		
		// criptografar senha
        String senhaCriptografada =  passwordEncoder.encode(dto.getSenha());
        usuario.setSenha(senhaCriptografada);

		repository.save(usuario);

		UsuarioGetDTO getDto = new UsuarioGetDTO();
		mapper.map(usuario, getDto);

		return getDto;
	}

	public String excluir(Integer idUsuario) {

		Optional<Usuario> result = repository.findById(idUsuario);

		if (result.isEmpty()) {
			throw new EntityNotFoundException("Usuário não encontrado.");
		}

		Usuario usuario = result.get();

		repository.delete(usuario);

		return "Usuário " + result.get().getNome() + " excluído com sucesso.";
	}
}
