package com.packt.cantata.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CorporationRepository extends JpaRepository<Corporation, String>{
	
//	List<Rental> findByCpNo(@Param("cpNo") Rental rental);
	
	@Query(value="SELECT * FROM Corporation WHERE id = (SELECT id From User WHERE id = :id);", nativeQuery=true)
	Corporation findByCeo(@Param("id") String id);
	
	@Query(value="SELECT * FROM Corporation WHERE id = :id ;", nativeQuery=true)
	Corporation findByCorp(@Param("id") String id);
}
