package com.packt.cantata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.domain.Plant;
import com.packt.cantata.domain.PlantRepository;

@RestController
//@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/plants")
public class PlantController {
	
	@Autowired
	private PlantRepository plantrepository;
	
	@GetMapping("/getplant")
	public Iterable<Plant> getplant(){
		return plantrepository.findAll();
	}
	
	@RequestMapping(value="/plantapp", method = RequestMethod.POST)
	public ResponseEntity<Plant> postplant(@RequestBody Plant plant ){
		Plant pav = plantrepository.save(plant);
		return ResponseEntity.status(HttpStatus.OK).body(pav);
	}
	
	@GetMapping("/filteredPlantToPerForm")
	public Iterable<Plant> filteredPlantToPerForm(){
		return plantrepository.filteredPlantToPerForm();
	}

}
