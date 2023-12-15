package com.packt.cantata.domain;



import java.time.LocalDate;
import java.util.ArrayList;
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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Brd_post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long postNo; // 글 번호

	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "brdNo")
	private Brd_division brdNo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id")
	private User id; //회원ID

	@Column(nullable = false)
	private long postNum; //BrdNo에 따라 번호를 정렬하는 용도
	
	@Column(nullable = false)
	private String postTitle; // 글제목


	@Column(nullable = false)
	private String postSub; // 글내용

	@Column(name = "postFile1") // 첨부파일 1
	private String postFile1;

	@Column(name = "postFile2") // 첨부파일 2
	private String postFile2;

	@Column(name = "postFile3") // 첨부파일 3
	private String postFile3;

	@Column(nullable = false)
	private int postViews; // 조회수

	@Column(nullable = false)
	private LocalDate postDate = LocalDate.now(); // 작성일, 기본값은 현재 날짜

	@Column
	private LocalDate postDeadline; // 게시표시일자	
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "postNo")
	private List<Reply> replies;
	
	@OneToMany(mappedBy = "brdPost", cascade = CascadeType.REMOVE)
//    @JsonManagedReference(value = "brd_post-files")
    private List<File> files = new ArrayList<>();
	
	public Brd_post( String postTitle,String postFile1, String postFile2, String postFile3,
			String postSub, LocalDate postDate, LocalDate postDeadline) {
		super();
		
		this.postTitle = postTitle;
		this.postFile1 = postFile1;
		this.postFile2 = postFile2;
		this.postFile3 = postFile3;
		this.postSub = postSub;
		this.postDate = postDate;
		this.postDeadline = postDeadline;
	}
	public Brd_post(String postTitle, String postFile1, String postFile2, String postFile3) {
		super();
		this.postTitle = postTitle;
		this.postFile1 = postFile1;
		this.postFile2 = postFile2;
		this.postFile3 = postFile3;
	}

	@Override
	public String toString() {
		return "Brd_post [postNo=" + postNo + ", postTitle=" + postTitle + ", postFile1=" + postFile1 
				+ ",postFile2=" + postFile2 + ", postFile3=" + postFile3 + ", postSub="
				+ postSub + ", postDate=" + postDate + ", postDeadline=" + postDeadline + ", brdNo =" + brdNo + "]";
	}
	
	public Brd_post(String postTitle) {
		super();
		this.postTitle = postTitle;
	}

}