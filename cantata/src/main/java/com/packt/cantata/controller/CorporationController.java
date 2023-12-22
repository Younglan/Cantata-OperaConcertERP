package com.packt.cantata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.domain.Corporation;
import com.packt.cantata.domain.CorporationRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/corporations")
@RequiredArgsConstructor
public class CorporationController {
	@Autowired
	private CorporationRepository corepo;
	@RequestMapping("/add")
	public void postCorp(@RequestBody Corporation corp) {
		corepo.save(corp);
	}

}
