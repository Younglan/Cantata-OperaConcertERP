package com.packt.cantata.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.packt.cantata.dto.dupleDto;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, String>{
	Optional<User> findById(String username);
	
	@Query(value="SELECT * FROM User WHERE User.id = :id", nativeQuery=true)
	User findIdById(@Param("id") String id);
	@Query(value="SELECT * FROM User WHERE User.email = :email", nativeQuery=true)
	User findEmailByEmail(@Param("email") String email);
	@Query(value="SELECT * FROM User WHERE User.tel = :tel", nativeQuery=true)
	User findTelByTel(@Param("tel") String tel);
}
