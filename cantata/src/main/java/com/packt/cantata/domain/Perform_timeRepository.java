package com.packt.cantata.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.packt.cantata.dto.Perform_timeDto;

@RepositoryRestResource
public interface Perform_timeRepository extends JpaRepository<Perform_time, Integer> {
	
	@Query(value="SELECT t.pt_date FROM perform_time t WHERE t.pt_status = 1 ORDER BY t.pt_date", nativeQuery=true)
	List<Date> findBygetpftimes();
	
	@Query(value="SELECT t.pt_no, t.pt_date FROM Perform_time t WHERE Date(t.pt_date) = :pt_date AND t.pf_code IN (SELECT p.pf_code FROM Performance p WHERE p.pf_title = :pf_title)", nativeQuery=true)
	List<Perform_timeDto> findBypftimequery(@Param("pt_date") LocalDate pt_date, @Param("pf_title") String pf_title);
	
	List<Perform_time> findByPfCode(@Param("pf_code") Performance performance);

	@Query(value="SELECT t.pt_date FROM Perform_time t WHERE t.pf_code = :pfCode AND t.pt_status = 1 ORDER BY t.pt_date", nativeQuery=true)
	List<Date> findByPfCode2(@Param("pfCode") String pfCode);

	@Query(value="SELECT * FROM Perform_time WHERE pt_status = true", nativeQuery=true)
	Iterable<Perform_time> findAllTimeList();
	
	@Query(value="SELECT * FROM Perform_time WHERE pf_code = :pfCode AND pt_status=1 AND (pt_date BETWEEN :ptDate AND :ptEndtime) OR (pt_endtime BETWEEN  :ptDate AND :ptEndtime) ;", nativeQuery=true)
	Iterable<Perform_time> findPfCodeAndPtDate(@Param("pfCode") Long pfCode, @Param("ptDate") String ptDate,  @Param("ptEndtime")String ptEndtime);
	
}
