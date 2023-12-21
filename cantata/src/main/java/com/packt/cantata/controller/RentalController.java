package com.packt.cantata.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.domain.Rental;
import com.packt.cantata.domain.RentalRepository;

@RestController
//@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping(value="/rentals")
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
	
	@RequestMapping(value="/rentalapp", method = RequestMethod.POST)
	public 	ResponseEntity<Rental> postrental(@RequestBody Rental rental ){
		Rental tlt = rentalrepository.save(rental);
		return ResponseEntity.status(HttpStatus.OK).body(tlt);
	}
	@DeleteMapping("/delrental")
	public void delRental(@RequestParam("rent_no")Long rent_no){
		 rentalrepository.deleteById(rent_no);
	}
	@Transactional
	@PutMapping("/updateStatus")
    public ResponseEntity<Rental> updateRentStatus(@RequestParam("rentno")Long rentNo, @RequestParam("status") String rent_status) {
				System.out.println(rentNo+rent_status);
		    	Rental tan =rentalrepository.findByRentNo(rentNo);
		    	tan.setRent_status(rent_status);
		    	return  ResponseEntity.ok(tan);
	}
}
