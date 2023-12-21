package com.packt.cantata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.Rental;
import com.packt.cantata.domain.RentalRepository;

@RestController
//@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
public class RentalController {
	
	@Autowired
	private RentalRepository rentalrepository;
	
//	@RequestMapping(value="/rentallist", method = RequestMethod.GET)
//	public List<Rental> testget(@RequestParam("cp") String cpno){
//		return rentalrepository.findByCpNo(cpno);
//	}
	@GetMapping("/allrental")
	public List<Rental> getRental(){
		return rentalrepository.findAll();
	}
	
	@RequestMapping(value="/rental", method = RequestMethod.POST)
	public 	ResponseEntity<Rental> postrental(@RequestBody Rental rental ){
		Rental tlt = rentalrepository.save(rental);
		return ResponseEntity.status(HttpStatus.OK).body(tlt);
	}
}
