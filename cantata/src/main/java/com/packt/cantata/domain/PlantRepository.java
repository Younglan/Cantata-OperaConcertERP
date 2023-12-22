package com.packt.cantata.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PlantRepository extends CrudRepository<Plant, Long>{
	Plant findByPlantNo(Long plantNo);
	
	@Query(value="SELECT * FROM plant WHERE plant_use='공연장' AND plant_status= true;", nativeQuery=true)
	Iterable<Plant> filteredPlantToPerForm();
	
	@Query(value="SELECT * FROM plant WHERE plant_status= true;", nativeQuery=true)
	Iterable<Plant> filteredPlant();

	Plant findTopByOrderByPlantNoDesc();

}
