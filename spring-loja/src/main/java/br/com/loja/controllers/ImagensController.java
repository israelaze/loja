//package br.com.loja.controllers;
//
//import java.io.IOException;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import br.com.loja.entities.Imagem;
//import br.com.loja.services.ImagemService;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.AllArgsConstructor;
//
//@CrossOrigin
//@RestController
//@AllArgsConstructor
//@Tag(name = "Imagens")
//@RequestMapping(value = "/api/imagens")
//public class ImagensController {
//
//	private final ImagemService imagemService;
//
//	@PostMapping
//	public ResponseEntity<?> uploadImage(@RequestParam("imagem")MultipartFile file) {
//		
//		try {
//			
//			Imagem uploadImage = null;;
//			if(file != null) {
//				uploadImage = imagemService.uploadImage(file);
//			}
//			return ResponseEntity.status(HttpStatus.OK)
//					.body(uploadImage);
//			
//		} catch (IOException e) {
//			return ResponseEntity.internalServerError().build();
//		} 
//	}
//
//	@GetMapping("/{fileName}")
//	public ResponseEntity<?> downloadImage(@PathVariable String fileName){
//		byte[] imageData=imagemService.downloadImage(fileName);
//		return ResponseEntity.status(HttpStatus.OK)
//				.contentType(MediaType.valueOf("image/png"))
//				.body(imageData);
//
//	}
//
//
//	
//}
