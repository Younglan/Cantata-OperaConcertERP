package com.packt.cantata.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reply {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long rep_no; //답변번호
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_no")
    private Brd_post post_no; 
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id")
	private User id; //회원ID
	
	@Column(nullable = false)
	private String rep_sub; //글내용
	
	@Column(nullable = false)
	private Date rep_date; //작성일
}
