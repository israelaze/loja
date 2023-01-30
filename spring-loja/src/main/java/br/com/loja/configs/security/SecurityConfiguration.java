package br.com.loja.configs.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  
  
	@Autowired
	private Environment env;

	private static final String[] SWAGGER = { "/v2/api-docs", "/swagger-resources", "/swagger-resources/**",
			"/configuration/ui", "/configuration/security", "/swagger-ui.html", "/webjars/**", "/v3/api-docs/**",
			"/swagger-ui/**", "/api-docs/**", "/h2-console/**" };
	


  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	  
	  if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			http.headers().frameOptions().disable();
		}
	  
    http
        .csrf()
        .disable()
        .authorizeHttpRequests()
        
        
        /*PERMITIR PROVISORIAMENTE PARA TESTES*/
		
	//	  .requestMatchers("/api/clientes/**", "/api/enderecos/**", "/api/fornecedores/**", "/api/produtos/**",
		//		  "/api/pedidos/**", "/api/vendedores/**").permitAll()
//		  .requestMatchers("/api/enderecos/**").permitAll()
//		  .requestMatchers("/api/fornecedores/**").permitAll()
//		  .requestMatchers("/api/produtos/**").permitAll()
//		  .requestMatchers("/api/pedidos/**").permitAll()
//		  .requestMatchers("/api/vendedores/**").permitAll()
		 


		// permitir o cadastro de usuário
		.requestMatchers("/api/usuarios/**").permitAll()
		// permitir autenticação do usuário
		.requestMatchers("/api/auth/**").permitAll()
		// permitir recuperar senha
		.requestMatchers("/api/recuperarsenha").permitAll()
		// permitir o acesso ao console do banco de dados h2
		.requestMatchers("/h2-console/**").permitAll()
		// permitir a documentação do swagger
		.requestMatchers(SWAGGER).permitAll()
		// permitir o envio de parâmetros adicionais no protocolo HTTP como por ex:
		// Header, Patch, et..
	//	.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		.anyRequest().authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
  
//  @Bean
//  public PasswordEncoder encoder(){
//      return new BCryptPasswordEncoder();
//  }

}
