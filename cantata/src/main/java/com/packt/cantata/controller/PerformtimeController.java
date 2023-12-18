package com.packt.cantata.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.CantataApplication;
import com.packt.cantata.domain.Perform_time;
import com.packt.cantata.domain.Perform_timeRepository;
import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;
import com.packt.cantata.dto.NewTimeDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/perform_times")
public class PerformtimeController {
	private static final Logger logger = LoggerFactory.getLogger(CantataApplication.class);
	
	
	@Autowired
	private Perform_timeRepository timeRepo;
	@Autowired
	private PerformanceRepository pfRepo;
	

	@GetMapping("/allTimeList")
	private Iterable<Perform_time> getTimes() {
		return timeRepo.findAll();
	}
	
	@GetMapping("/pfTimeList/{pfCode}")
	private List<Perform_time> getPerformTimes(Performance performance) {
		System.out.println(performance);
		return timeRepo.findByPfCode(performance);
	}
	
	@PostMapping
	public ResponseEntity<Perform_time> createPerformTime(@RequestBody NewTimeDto newTimeDto) {
	    Perform_time performTime = new Perform_time();
	    performTime.setPtDate(newTimeDto.getPtDate());

	    Performance performance = pfRepo.findByPfCode(newTimeDto.getPfCode());
	    performTime.setPfCode(performance);

	    Perform_time savedPerformTime = timeRepo.save(performTime);

	    return ResponseEntity.ok(savedPerformTime);
	}

}