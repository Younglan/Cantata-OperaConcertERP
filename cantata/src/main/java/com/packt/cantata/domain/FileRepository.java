package com.packt.cantata.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FileRepository extends JpaRepository<File, Long> {

	List<File> findByPerformance(Performance performance);
	List<File> findByBrdPost(Brd_post brdPost);
//    List<File> findByMember(Member member);
//    List<File> findByEdu(Edu edu);
//    List<File> findByPost(Post post);
//    List<File> findByBrd_postPostNo(Long postNo);
//    List<File> findByPostIsNotNull();
//    List<File> findByEduIsNotNull();
//    List<File> findByEduHistIsNotNull();
//    List<File> findByMemberIsNotNull();
//    List<File> findBySpaceIsNotNull();
}