package br.com.loja.configs.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;

	/*
	 * verificar se a requisição contém um JSON Web Token (JWT) válido no cabeçalho "Authorization"
	 */
	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain) throws ServletException, IOException {

		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;

		//verifica se o cabeçalho está presente e começa com a string "Bearer"
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		//extrai a string token JWT do cabeçalho 
		jwt = authHeader.substring(7);
		
		//recupera o e-mail do usuário
		userEmail = jwtService.extractUsername(jwt);
		
		//verifica se existem informações de autenticação para a solicitação atual.
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			//busca os detalhes do usuário
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

			//verifica se o token JWT é válido
			if (jwtService.isTokenValid(jwt, userDetails)) {
				
				// cria um token de autenticação para o usuário que detém o token JWT.
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				
				//adiciona os detalhes da solicitação
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				// armazena o token de autenticação no contexto de segurança,
				SecurityContextHolder.getContext().setAuthentication(authToken);
	    	    log.info(">>>>>>>> TOKEN VÁLIDO");

			}else {
	    	    log.info(">>>>>>>> TOKEN INVÁLIDO");

			}
		}
		
		// processando a requisição
		log.info(">>>>>>>> VAI PROCESSAR A REQUISIÇÃO");
		filterChain.doFilter(request, response);
	}

}
