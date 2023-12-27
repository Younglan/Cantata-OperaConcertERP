package com.packt.cantata.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.domain.User;
import com.packt.cantata.domain.UserRepository;
import com.packt.cantata.service.JwtService;
import com.packt.cantata.service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/member")
public class MemberController {
	
	@Autowired
	private UserRepository usrrepo;
	@Autowired
	private LoginService loginService;
	@Autowired
	private JwtService jwtService;
	private final PasswordEncoder Encoder;
	@RequestMapping(value="/updateRecent") 
	@Transactional
	public void updateUser(@RequestParam("id") String id) {
		User userr = usrrepo.findIdById(id);
		userr.setRecent_date(new Date());
    }
	
	@RequestMapping(value="/Duple", method=RequestMethod.GET) 
	public ResponseEntity<Boolean> checkDuple(@RequestParam("type") String type, @RequestParam("value") String value) {
		System.out.println(loginService.checkDuplicate(type, value));
		 return ResponseEntity.ok(loginService.checkDuplicate(type, value));
    }
	
	@RequestMapping(value="/findid", method=RequestMethod.GET) 
	public ResponseEntity<User> showId(@RequestParam("tel") String tel) {
		System.out.println(tel);
		 return ResponseEntity.ok(usrrepo.findTelByTel(tel));
    }	
	@RequestMapping(value="/pwdchan") 
	@Transactional
	public void changePwd(@RequestParam("id") String id, @RequestParam("pwd") String pwd){
		
		User useru = usrrepo.findIdById(id);
		useru.setPassword(Encoder.encode(pwd));
	}
	@RequestMapping(value="/remove") 
	public void removeMember(HttpServletRequest request){
		String user = jwtService.getAuthUser(request);
		usrrepo.deleteById(user);
	}
}
