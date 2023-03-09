//package br.com.loja.entities;
//
//import jakarta.persistence.Basic;
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Lob;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//@Table(name = "imagens")
//public class Imagem {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Integer idImagem;
//
//	private String nomeImagem;
//	private String tipo;
//	
//	@Lob
//  //  @Column(length = 1000)
//	@Basic(fetch = FetchType.LAZY)
//	private byte[] foto;
//	
//	@OneToOne(mappedBy = "imagem", cascade = CascadeType.ALL)
//	private Cliente cliente;
//}
