package com.packt.cantata.controller;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.CantataApplication;
import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;
import com.packt.cantata.service.PerformanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/performances")
public class PerformanceController {
	private static final Logger logger = LoggerFactory.getLogger(CantataApplication.class);
	
		
	@Autowired
	private PerformanceRepository pfRepository;
	@Autowired
	private PerformanceService pfService; 
	
	
	public Iterable<Performance> getPerforms(){
		//전체공연 검색 및 반환
		return pfRepository.findAll();
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
	

