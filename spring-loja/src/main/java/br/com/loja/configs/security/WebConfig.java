//package br.com.loja.configs.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebMvc
//public class WebConfig {
//
////	@Value("${cors.origins}")
////	private String corsOrigins;
//
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**")
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//				//.allowedOrigins(corsOrigins)
//				.allowedOrigins("*") 
//                .allowedHeaders("Origin", "Content-Type", "Accept")
//             //   .allowCredentials(true)
//                //tempo máximo (em segundos) que a configuração do CORS deve ser armazenada em cache.
//                .maxAge(3600); 
//			}
//		};
//	}
//
//}
