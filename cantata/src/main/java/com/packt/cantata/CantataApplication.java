package com.packt.cantata;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.packt.cantata.domain.Brd_division;
import com.packt.cantata.domain.Brd_divisionRepository;
import com.packt.cantata.domain.Brd_post;
import com.packt.cantata.domain.Brd_postRepository;
import com.packt.cantata.domain.Perform_time;
import com.packt.cantata.domain.Perform_timeRepository;
import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;

@SpringBootApplication
public class CantataApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(CantataApplication.class);

	SimpleDateFormat dtFormat = new SimpleDateFormat ("yyyy-MM-dd");
	
	@Autowired
	private PerformanceRepository pfRepository;
	@Autowired
	private Perform_timeRepository timeRepository;
	
	@Autowired
	private Brd_divisionRepository brdRepository;
	
	@Autowired
	private Brd_postRepository postRepository;

	public static void main(String[] args) {
		SpringApplication.run(CantataApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {

		Performance pf1 = new Performance("전시", 
				"20주년 기념 상상아트 전시회", 
				"상상극단", 
				"042-222-5555",
				"posterURI", 
				"exIMG",
				"상세설명이에요",
				"공연공지사항",
				dtFormat.parse("2023-11-23"), dtFormat.parse("2023-12-01"),
				3,
				50000,40000,30000,10000,5000,1000,null);
		Performance pf2 = new Performance("공연", 
				"행복한왕자", 
				"상상극단", 
				"042-222-5555",
				"posterURI", 
				"exIMG",
				"상세설명이에요",
				"공연공지사항",
				dtFormat.parse("2023-11-23"), dtFormat.parse("2023-12-01"),
				3,
				50000,40000,30000,10000,5000,1000,null);
		
		Perform_time pt1 = new Perform_time(pf2,dtFormat.parse("2023-12-01"),true);

		pfRepository.saveAll(Arrays.asList(pf1,pf2));
		timeRepository.saveAll(Arrays.asList(pt1));
		
		
		for (Performance pf : pfRepository.findAll()) {
			logger.info(pf.getPfCode() + " " +pf.getPfCate() + " " + pf.getPfTitle());
			System.out.println(pf.getPfCode());
		}
		
		Brd_division brd1 = new Brd_division("센터소개");
		
		Brd_division brd2 = new Brd_division("시설소개");
		
		Brd_division brd3 = new Brd_division("센터소식");

		Brd_division brd4 = new Brd_division("이벤트");
	
		Brd_division brd5 = new Brd_division("자주하는 질문");

		Brd_division brd6 = new Brd_division("1:1 문의");
	
		brdRepository.saveAll(Arrays.asList(brd1, brd2, brd3, brd4, brd5, brd6));
		
		for (Brd_division brd : brdRepository.findAll()) {
			logger.info(brd.getBrdName());
		}
		
		for (Brd_post post : postRepository.findAll()) {
			logger.info(post.getPostTitle());
		}
		

	}
}