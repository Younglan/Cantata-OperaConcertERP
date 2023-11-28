package com.packt.cantata.web;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.domain.Perform_timeRepository;
import com.packt.cantata.domain.PerformanceRepository;

@RestController
public class TicketController {
	@Autowired
	private PerformanceRepository pfrepository;
	@Autowired
	private Perform_timeRepository pftrepo;
	@RequestMapping(value="/pftdate")
	public List<Date> getDates(){
		return pftrepo.findBygetpftimes();
	}
	@RequestMapping(value="/pftime") 
	public List<Date> getTimes(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate pt_date, @RequestParam("title") String pf_title){
		String tmp_title = String.valueOf(pf_title);
		return pftrepo.findBypftimequery(pt_date, tmp_title);
	}
	
	@RequestMapping(value="/tickdate") 
	public List<String> getTitles(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate pt_date){
		return pfrepository.findBypftitlequery(pt_date);	
	}
}
