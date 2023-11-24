package com.packt.cantata.service;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;

import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;

public class PerformanceService {
	@Autowired
	private PerformanceRepository pfRepository;
	
	SimpleDateFormat dtFormat = new SimpleDateFormat ("yyyy-MM-dd");
	
	public void createPerform(Performance performance) {
        
    }
	
	
	
}
