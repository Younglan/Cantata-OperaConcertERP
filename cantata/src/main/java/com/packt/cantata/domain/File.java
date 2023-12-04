package com.packt.cantata.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class File {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long fileNum;
	
	@ManyToOne
	@JsonManagedReference(value = "performance-files")
	@JoinColumn(name = "pf_code", nullable=true)
	private Performance performance;	
	
    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileOriName;

    @Column(nullable = false)
    private String  fileUri;
}
