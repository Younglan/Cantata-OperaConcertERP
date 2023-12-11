package com.packt.cantata.domain;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface TicketRepository extends CrudRepository<Ticket, Long>{
	@Query(value="SELECT t.seat_no FROM Ticket t WHERE t.pt_no = :pt_no", nativeQuery=true)
	List<String> findByptnquery(@Param("pt_no") int pt_no);
	
	@Query(value="SELECT * FROM Ticket t WHERE t.tic_no = :ticket", nativeQuery=true)
	Ticket findByTicno(@Param("ticket") Long tic_no);
}

