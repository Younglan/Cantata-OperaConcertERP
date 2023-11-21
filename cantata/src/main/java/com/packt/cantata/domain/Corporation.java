package com.packt.cantata.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Corporation {
	@Id
	@Column(nullable = false, updatable=false)
	private String cp_no;
	@Column(nullable = false)
	private String cp_name;
	private String cp_addre;
	private String ceo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id")
	private User id;
	
	public Corporation(String cp_no, User id, String cp_name, String cp_addre, String ceo) { 
		super();
		this.cp_no = cp_no;
		this.id = id;
		this.cp_name = cp_name;
		this.cp_addre = cp_addre;
		this.ceo = ceo;
	}
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cp_no")
	private List<Rental> rentals;
}
