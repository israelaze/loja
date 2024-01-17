package br.com.loja.configs;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

//http://localhost:8080/swagger-ui/index.html

@Configuration
public class SwaggerConfiguration {
	
	final String securitySchemeName = "bearerAuth";

	@Bean
	public OpenAPI myOpenAPI() {
		Contact contact = new Contact();
//		contact.setEmail("");
		contact.setName("Israel Fraga - GitHub");
		contact.setUrl("https://github.com/israelaze?tab=repositories");
				
		Server localServer = new Server();
		localServer.setUrl("http://localhost:8080");
		localServer.setDescription("URL do servidor no ambiente LOCAL");

		Server productionServer = new Server();
//		productionServer.setUrl("");
//		productionServer.setDescription("URL do servidor no ambiente PRODUÇÃO");

//		License mitLicense = new License()
//				.name("MIT License")
//				.url("https://choosealicense.com/licenses/mit/");

		Info info = new Info()
				.title("Minha Loja - Sistema Comercial")
				.contact(contact)
//				.version("1.0")
				.description("Projeto exemplo CRUD - API Spring + Angular para portifólio.");
//				.termsOfService("")
//				.license(null);


		return new OpenAPI()
				.info(info)
				.servers(List.of(localServer, productionServer))
				.addSecurityItem(new SecurityRequirement()
				.addList(securitySchemeName))
				.components(new Components()
				.addSecuritySchemes(securitySchemeName, new SecurityScheme()
				.name(securitySchemeName)
				.type(SecurityScheme.Type.HTTP)
				.scheme("bearer")
				.bearerFormat("JWT")));

	}
}
