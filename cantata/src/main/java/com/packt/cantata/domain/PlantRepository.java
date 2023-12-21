package com.packt.cantata.domain;

import org.springframework.data.repository.CrudRepository;

public interface PlantRepository extends CrudRepository<Plant, Long>{
	Plant findByPlantNo(Long plantNo);

}
