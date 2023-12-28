package com.packt.cantata.dto;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Brd_postDto{
	private Long postNo; // 글 번호
	private Long brdNo;
//	private User id; //회원ID
	private long postNum; //BrdNo에 따라 번호를 정렬하는 용도
	private String postTitle; // 글제목
	private String postSub; // 글내용
//	private String postFile1;
//	private String postFile2;
//	private String postFile3;
//	private int postViews; // 조회수
//	private Boolean postStatus = true; //true면 게시판에 보이고 false면 보이지 않는다.
	private Date postDeadline; // 게시표시일자	
	
	@Override
	public String toString() {
		return "Brd_post [postNo=" + postNo + ", postTitle=" + postTitle + ", postSub="
				+ postSub + ", postDeadline=" + postDeadline + ", brdNo =" + brdNo + "]";
	}
}