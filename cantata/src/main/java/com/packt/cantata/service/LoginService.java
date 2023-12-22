package com.packt.cantata.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.packt.cantata.domain.UserRepository;

import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {
	
	private final UserRepository usrrepo;
	
	 public boolean checkDuplicate(String type, String value) {
	        switch (type) {
	            case "id":
	                return usrrepo.findIdById(value) != null;
	            case "email":
	                return usrrepo.findEmailByEmail(value) != null;
	            case "tel":
	                return usrrepo.findTelByTel(value) != null;
	            default:
	                throw new IllegalArgumentException("잘못된 유형");
	        }
	    }
}
