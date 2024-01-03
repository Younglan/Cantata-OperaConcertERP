package com.packt.cantata.service;

import java.io.IOException;
import java.util.NoSuchElementException;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.packt.cantata.domain.Brd_post;
import com.packt.cantata.domain.Brd_postRepository;

@Service
public class Brd_postService {

	@Autowired
	private Brd_postRepository postRepository;

	public Long getTopByPostNoForBrdNo(Long brdNo) {
		Long lastPostNo = postRepository.findTopByOrderByPostNoForBrdNo(brdNo);
		return lastPostNo != null ? lastPostNo : 0L; //null값이 아닐때 brdNo값 기준 가장 큰 postNum 리턴 단 만약 null이라면 Long 0값을 리턴
	}
	
	public Long getLastPostNumForBrdNo(Long brdNo) {
	    Long lastPostNum = postRepository.findLastPostNumForBrdNo(brdNo);
	    return lastPostNum != null ? lastPostNum : 0L; //null값이 아닐때 brdNo값 기준 가장 큰 postNum 리턴 단 만약 null이라면 Long 0값을 리턴
	} 
//	public Long getLastPostNum() {
//		Long lastPostNum = postRepository.findLastPostNum();
//		return lastPostNum != null ? lastPostNum : 0L;
//	}

	public Brd_post savePost(Brd_post brdPost) {
		Long lastPostNum = getLastPostNumForBrdNo(brdPost.getBrdNo().getBrdNo());
		brdPost.setPostNum(lastPostNum + 1);

		// Save the post
		return postRepository.save(brdPost);
	}
	
	public void postView(Long postNo) {
		Brd_post post = postRepository.findById(postNo)
				.orElseThrow(() -> new NoSuchElementException("게시물을 찾을 수 없습니다."));
		
		post.setPostViews(post.getPostViews() + 1);
		postRepository.save(post);
	}
	
    public void updatePost(Long postNo, Brd_post updatedPost) {
        Brd_post existingPost = postRepository.findById(postNo)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postNo));

        // 여기에서 필요한 업데이트 로직을 수행
        //글 제목, 내용 등을 업데이트
        existingPost.setPostTitle(updatedPost.getPostTitle());
        existingPost.setPostFile1(updatedPost.getPostFile1());
        existingPost.setPostSub(updatedPost.getPostSub());
        existingPost.setPostDeadline(updatedPost.getPostDeadline());

        // 업데이트된 글을 저장합니다.
        postRepository.save(existingPost);
    }
	
//	public void savFileToPost(Long postNo, MultipartFile file) throws IOException {
//		Brd_post post = postRepository.findById(postNo).orElseThrow(EntityNotFoundException::new);
//		
//		//MultipartFile을 byte 배열로 변환
//		byte[] fileBytes = file.getBytes();
//		
//		//덴티티 파일에 데이터 설정
//		post.setPostFile1(fileBytes);
//		
//		//저장된 엔티티 업데이트
//		postRepository.save(post);
//    }
}
