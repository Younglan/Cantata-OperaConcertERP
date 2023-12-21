package com.packt.cantata.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository  extends JpaRepository<Rental, Long>{
//	@Query(value="SELECT * FROM Perform_time WHERE pf_code = :pfCode AND pt_status=1 AND (pt_date BETWEEN :ptDate AND :ptEndtime) OR (pt_endtime BETWEEN  :ptDate AND :ptEndtime) ;", nativeQuery=true)
//	Iterable<Perform_time> findPfCodeAndPtDate(@Param("plantNo") Long plantNo, @Param("ptDate") String ptDate,  @Param("ptEndtime")String ptEndtime);
	Rental findByRentNo(Long rentNo);
}
