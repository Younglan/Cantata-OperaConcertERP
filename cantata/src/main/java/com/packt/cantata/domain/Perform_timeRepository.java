package com.packt.cantata.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.packt.cantata.dto.Perform_timeDto;

public interface Perform_timeRepository extends JpaRepository<Perform_time, Long> {
	@Query(value="SELECT t.pt_date FROM perform_time t ORDER BY t.pt_date", nativeQuery=true)
	List<Date> findBygetpftimes();
	
	@Query(value="SELECT t.pt_no, t.pt_date FROM Perform_time t WHERE Date(t.pt_date) = :pt_date AND t.pf_code IN (SELECT p.pf_code FROM Performance p WHERE p.pf_title = :pf_title)", nativeQuery=true)
	List<Perform_timeDto> findBypftimequery(@Param("pt_date") LocalDate pt_date, @Param("pf_title") String pf_title);
	
	@Query(value="SELECT t.pt_date FROM Perform_time t WHERE t.pf_code = :pfCode", nativeQuery=true)
	List<Date> findByPfCode(@Param("pfCode") String pfCode);
}
