//package br.com.loja.services;
//
//import java.io.IOException;
//import java.util.Optional;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import br.com.loja.entities.Imagem;
//import br.com.loja.repositories.ImagemRepository;
//import br.com.loja.utils.ImagemUtils;
//import jakarta.transaction.Transactional;
//import lombok.AllArgsConstructor;
//
//@Service
//@Transactional
//@AllArgsConstructor
//public class ImagemService {
//
//	private final ImagemRepository imagemRepository;
//
//	public Imagem uploadImage(MultipartFile file) throws IOException {
//
//		Imagem imagem = Imagem.builder()
//				.nomeImagem(file.getOriginalFilename())
//				.tipo(file.getContentType())
//				.foto(ImagemUtils.compressImage(file.getBytes()))
//				.build();
//		if (imagem != null) {
//			return imagem;
//		}
//		return null;
//	}
//
//	public Imagem salvarImagem(Imagem imagem) {
//		
//		return imagemRepository.save(imagem);
//		
//	}
//	
//	public byte[] downloadImage(String fileName) {
//		Optional<Imagem> dbImageData = imagemRepository.findByNomeImagem(fileName);
//		byte[] images = ImagemUtils.decompressImage(dbImageData.get().getFoto());
//		return images;
//	}
//
//	public Imagem getImagem(String fileName) {
//		Optional<Imagem> result = imagemRepository.findByNomeImagem(fileName);
//
//		Imagem imagem = result.get();
//
//		return imagem;
//
//	}
//
//}
