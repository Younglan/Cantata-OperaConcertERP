package com.packt.cantata.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.CantataApplication;
import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;
//import com.packt.cantata.service.PerformanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/performances")
public class PerformanceController {
	private static final Logger logger = LoggerFactory.getLogger(CantataApplication.class);
	
		
	@Autowired
	private PerformanceRepository pfRepository;
//	@Autowired
//	private PerformanceService pfService; 
	
//	@GetMapping
	public List<Performance> getPerforms(){
		//전체공연 검색 및 반환
		return pfRepository.findAll();
	}
	@GetMapping("/lastPfCode")
	public ResponseEntity<Long> getLastPostNum() {
		Performance lastPerformNum = pfRepository.findTopByOrderByPfCodeDesc();
        logger.info("Last Perform Code: " + lastPerformNum);
        if (lastPerformNum != null) {
            return ResponseEntity.ok().body(lastPerformNum.getPfCode());
        }
        return ResponseEntity.ok().body(0L);  // 0을 반환하거나 다른 기본값을 반환할 수 있습니다.
	}
	
//	@PostMapping("/new")
	// http://localhost:8090/performances/new
//	public String postPerforms(@RequestBody Map<String, String> postData){
//		Date stDate = postData.getPfStart();
//		String edDate = postData.getPfEnd();
//		postData.setPfStart(dtFormat.parse(postData.getPfStart()));
		
		
//		pfService.createPerform(postData);
//
//		pfRepository.saveAll(Arrays.asList(pfInput));
//		
//		for (Performance pf : pfRepository.findAll()) {
//			logger.info(pf.getPfCate() + " " + pf.getPfTitle());
//		}
	}
	


