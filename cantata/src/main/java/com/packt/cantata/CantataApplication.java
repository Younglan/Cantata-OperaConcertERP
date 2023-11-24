package com.packt.cantata;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;

@SpringBootApplication
public class CantataApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(CantataApplication.class);

	SimpleDateFormat dtFormat = new SimpleDateFormat ("yyyy-MM-dd");
	
	@Autowired
	private PerformanceRepository pfRepository;

	public static void main(String[] args) {
		SpringApplication.run(CantataApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {

		Performance pf1 = new Performance("전시", 
				"20주년 기념 상상아트 전시회", 
				"상상극단", 
				"posterURI", 
				"exIMG",
				"상세설명이에요",
				"공연공지사항",
				dtFormat.parse("2023-11-23"), dtFormat.parse("2023-12-01"),
				3,
				50000,30000,10000,5000,1000,
				true);

		pfRepository.saveAll(Arrays.asList(pf1));
		
		for (Performance pf : pfRepository.findAll()) {
			logger.info(pf.getPfCate() + " " + pf.getPfTitle());
		}
		

	}
}
