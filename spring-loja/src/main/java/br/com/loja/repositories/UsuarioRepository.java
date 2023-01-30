package br.com.loja.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.loja.entities.Usuario;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Integer>{

	Optional<Usuario> findByEmail(String email);
}
