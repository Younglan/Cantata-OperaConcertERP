package com.packt.cantata.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

public class Reply {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long rep_no; //답변번호
	
	@ManyToOne
    @JsonManagedReference(value = "brd_post-reply")
    @JoinColumn(name = "post_no", nullable = false)
    private Brd_post post_no; //글번호
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonManagedReference(value = "user-reply")
	@JoinColumn(name = "id")
	private User id; //회원ID
	
	@Column(nullable = false)
	private String rep_sub; //글내용
	
	@Column(nullable = false)
	private Date rep_date; //작성일
}
