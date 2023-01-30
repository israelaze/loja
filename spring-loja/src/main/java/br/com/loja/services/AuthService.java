package br.com.loja.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.loja.configs.security.JwtService;
import br.com.loja.dtos.auth.AuthGetDTO;
import br.com.loja.dtos.auth.AuthPostDTO;
import br.com.loja.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuthService {

	private final JwtService jwtService;
	private final UsuarioRepository repository;
	private final AuthenticationManager authenticationManager;

	public AuthGetDTO autenticar(AuthPostDTO dto) {
		
		
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha()));
		
		

		var usuario = repository.findByEmail(dto.getEmail()).orElseThrow();

		var jwtToken = jwtService.generateToken(usuario);

		return AuthGetDTO.builder().accessToken(jwtToken).build();
	}
}
