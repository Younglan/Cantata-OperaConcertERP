package com.packt.cantata;

import static org.assertj.core.api.Assertions.assertThat;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PerformanceRepositoryTest {
	@Autowired
	private PerformanceRepository pfRepository;
	
	SimpleDateFormat dtFormat = new SimpleDateFormat ("yyyy-MM-dd");
	
	@Test
	void findPerform() {
		pfRepository.findAll();
	}
	
	@Test
	void savePerform() {
		try {
		
			pfRepository.save(new Performance("전시", 
					"20주년 기념 상상아트 전시회", 
					"상상극단", 
					"posterURI", 
					"exIMG",
					"상세설명이에요",
					"공연공지사항",
					dtFormat.parse("2023-11-23"), dtFormat.parse("2023-12-01"),
					3,
					50000,30000,10000,5000,1000,
					true));
			assertThat(pfRepository.findByPfCate("전시")).toString();			
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
//	@Test
//	void deletePerform() {
//		pfRepository.save(new Performance("공연", "라보헴", "상상극단", "posterURI", "라보헴 공연설명이에요~"));
//		pfRepository.deleteAll();
//		assertThat(pfRepository.count()).isEqualTo(0);
//	}

}
