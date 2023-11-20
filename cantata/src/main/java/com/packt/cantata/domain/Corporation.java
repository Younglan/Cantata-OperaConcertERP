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
import javax.persistence.Table;

import org.apache.catalina.User;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
@NoArgsConstructor
@Table(name = "Corporation")
public class Corporation {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(nullable = false, updatable=false)
	private String cp_no;
	private String id;
	private String cp_name;
	private String cp_addre;
	private String ceo;
	
	public Corporation(String cp_no, String id, String cp_name, String cp_addre, String ceo) { 
		super();
		this.cp_no = cp_no;
		this.id = id;
		this.cp_name = cp_name;
		this.cp_addre = cp_addre;
		this.ceo = ceo;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id")
	private User user;
}
