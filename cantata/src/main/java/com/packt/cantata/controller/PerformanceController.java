package com.packt.cantata.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.packt.cantata.CantataApplication;
import com.packt.cantata.domain.Performance;
import com.packt.cantata.domain.PerformanceRepository;
import com.packt.cantata.domain.Plant;
import com.packt.cantata.domain.PlantRepository;
//import com.packt.cantata.service.PerformanceService;
import com.packt.cantata.dto.PerformanceFormDto;
import com.packt.cantata.service.FileService;

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
	@Autowired
	private PlantRepository plantRepo;
	@Autowired
	private FileService fileService;
	
	@RequestMapping("/allPerform")
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
	
	@PostMapping("/new")
	public ResponseEntity<Performance> postPerforms(@RequestPart("pfPosterFile") MultipartFile posterFile,
														@RequestPart("perform") String performJson){
		ObjectMapper objectMapper = new ObjectMapper();
	    PerformanceFormDto perform = null;
		try {
			perform = objectMapper.readValue(performJson, PerformanceFormDto.class);
		} catch (JsonProcessingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	
		Performance newPerform = new Performance();
		//외래키입력 
		Plant plant = plantRepo.findByPlantNo(perform.getPlantNo());
		newPerform.setPlantNo(plant);
		
		newPerform.setPfCate(perform.getPfCate());
		newPerform.setPfTitle(perform.getPfTitle());
		newPerform.setAgency(perform.getAgency());
		newPerform.setAgencyTel(perform.getAgencyTel());
	//		newPerform.setPfEximg(postData.getPfEximg());
		newPerform.setPfStart(perform.getPfStart());
		newPerform.setPfEnd(perform.getPfEnd());
		newPerform.setPfRuntime(perform.getPfRuntime());
		newPerform.setPfNotice(perform.getPfNotice());
		newPerform.setPfExplan(perform.getPfExplan());
		newPerform.setR(perform.getR());
		newPerform.setS(perform.getS());
		newPerform.setA(perform.getA());
		newPerform.setB(perform.getB());
		newPerform.setC(perform.getC());
		newPerform.setD(perform.getD());
	
		//첨부파일 처리
		if(posterFile!=null ) {
			ResponseEntity<Long> number = getLastPostNum();
			Long incrementedNum;
			if (number.getStatusCode().is2xxSuccessful() && number.getBody() != null) {
			    incrementedNum = number.getBody() + 1;
			} else {
				incrementedNum = (long) 1;
			}
				
			try {
				newPerform.setPfPoster(fileService.attachUploadAndGetUri(posterFile, "performance", incrementedNum));
			} catch (IOException e) {
				e.printStackTrace();
			} 
				
		}
		
		//새로운공연 등록
		Performance savedPerform = pfRepository.save(newPerform);
		return ResponseEntity.ok(savedPerform);

	}
	
	
	@GetMapping("/checkPerformDate")
	public Boolean checkPerformDate(@RequestParam Long plantNo,  @RequestParam String startDate, @RequestParam String endDate) {
		Iterable<Performance> findPerforms = pfRepository.checkPerform(plantNo, startDate, endDate);
		if(findPerforms == null || !findPerforms.iterator().hasNext()) {
			return true;
		}else {
			return false;
		}
	}
}
