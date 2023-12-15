package com.packt.cantata.domain;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.packt.cantata.dto.PerformDto;

//@RepositoryRestResource(path="performances")
@RepositoryRestResource
public interface PerformanceRepository  extends JpaRepository<Performance, Long> {
	@Query(value="SELECT DISTINCT p.pf_title FROM Performance p WHERE p.pf_code IN (SELECT perform_time.pf_code FROM perform_time where DATE(perform_time.pt_date) = :pt_date)", nativeQuery=true)
	List<String> findBypftitlequery(@Param("pt_date") LocalDate pt_date);		
	
	List<Performance> findByPfCate(@Param("pfCate") String pfCate);
	
	@Query(value="SELECT p.pf_code, p.r, p.s, p.a, p.b, p.c, p.d, p.pf_title,p.pf_poster,p.pf_runtime,pf_start,pf_end FROM Performance p WHERE p.pf_title = :pf_title", nativeQuery=true)
	PerformDto findBypfcodequery(@Param("pf_title") String pf_title);	
	
	Performance findTopByOrderByPfCodeDesc();

	Performance findByPfCode(Long pfCode);
	
}