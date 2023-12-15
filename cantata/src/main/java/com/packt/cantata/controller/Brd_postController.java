package com.packt.cantata.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cantata.CantataApplication;
import com.packt.cantata.domain.Brd_division;
import com.packt.cantata.domain.Brd_post;
import com.packt.cantata.domain.Brd_postRepository;
import com.packt.cantata.service.Brd_postService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/brd_posts")
public class Brd_postController {
    private static final Logger logger = LoggerFactory.getLogger(CantataApplication.class);

    @Autowired
    private Brd_postRepository postRepository;
    
    @Autowired
    private Brd_postService postService;

//    @Autowired
//    private Brd_divisionRepository divisionRepository;
    
   @GetMapping("/allPosts")
    public List<Brd_post> getBrd_Posts() {
        return postRepository.findAll();
    }
    
    @GetMapping("/searchBrdNo/{brdNo}")
    public List<Brd_post>getBrd_postsNo(Brd_division brdNo){
    	return postRepository.findByBrdNo(brdNo);
    }
    
    @GetMapping("/lastPostNo")
    public ResponseEntity<Long> getLastPostNo() {
        Brd_post lastPostNo = postRepository.findTopByOrderByPostNoDesc();
        logger.info("Last Post No: " + lastPostNo);
        if (lastPostNo != null) {
            return ResponseEntity.ok().body(lastPostNo.getPostNo());
        }
        return ResponseEntity.ok().body(0L);  // 0을 반환하거나 다른 기본값을 반환
    }
    
    @GetMapping("/lastPostNum/{brdNo}")
    public ResponseEntity<Long> getLastPostNumForBrdNo(@PathVariable Long brdNo) {
        try {
            Long lastPostNum = postService.getLastPostNumForBrdNo(brdNo);
            return ResponseEntity.ok(lastPostNum);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
//    @GetMapping("/lastPostNum")
//    public ResponseEntity<Long> getLastPostNum() {
//        try {
//            Long lastPostNum = postService.getLastPostNum();
//            return ResponseEntity.ok(lastPostNum);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
    
    @PutMapping("/postView/{postNo}")
    public ResponseEntity<Void> postView(@PathVariable Long postNo){
    	try {
    		postService.postView(postNo);
    		return ResponseEntity.ok().build();
    	} catch (Exception e) {
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    	}
    	
    }
    
    @PostMapping("/newPost")
    public ResponseEntity<Brd_post> createNewPost(@RequestBody Brd_post brdPost) {
        try {
            //게시물 저장 코드
            Brd_post savedPost = postService.savePost(brdPost); //Brd_postService에서 savePost값을 가져온다.
            return ResponseEntity.ok(savedPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
        
    
//    @PostMapping("/newPost") //BrdNo별로 게시판 분리용이었지만 위의 역할로 인해 필요없어졌지만 만약을 대비해 일단 주석처리
//    public ResponseEntity<String> saveBrdPost(@RequestBody Brd_post post) {
//        try {
//            // Brd_post에서 Brd_division을 가져옵니다.
//            Brd_division division = post.getBrdNo();
//
//            // 가져온 Brd_division이 없다면 새로 생성하여 저장합니다.
//            if (division != null && division.getBrdNo() == null) {
//                divisionRepository.save(division);
//            }
//
//            // Brd_post를 저장합니다.
//            postRepository.save(post);
//
//            return ResponseEntity.ok("저장완료.");
//        } catch (Exception e) {
//            logger.error("글 저장 중 오류 발생", e);
//            return ResponseEntity.status(500).body("저장되지 않았습니다.");
//        }
//    }
}
