package com.packt.cantata.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(path="performances")
@RepositoryRestResource
public interface PerformanceRepository  extends JpaRepository<Performance, Long> {
	
	
	
	List<Performance> findByPfCate(@Param("pfCate") String pfCate);
	
}
