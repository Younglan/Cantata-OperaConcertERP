package com.packt.cantata.domain;



import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Brd_post {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long post_no; // 글 번호

	// JsomManagedReference 에 있는 것들은 전부 임시
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "brd_no")
	private Brd_division brd_no;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id")
	private User id; //회원ID

	@Column(nullable = false)
	private String post_title; // 글제목

	@Column(nullable = false)
	private String post_sub; // 글내용

	@Column(name = "post_file1") // 첨부파일 1
	private String post_file1;

	@Column(name = "post_file2") // 첨부파일 2
	private String post_file2;

	@Column(name = "post_file3") // 첨부파일 3
	private String post_file3;

	@Column(nullable = false)
	private int post_views; // 조회수

	@Column(nullable = false)
	private Date post_date; // 작성일

	@Column
	private Date post_deadline; // 게시표시일자
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "post_no")
	private List<Reply> replies;
}