package com.packt.cantata.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Brd_division {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long brd_no;

	@Column(nullable = false)
	private String brd_name;

	public Brd_division(String brd_name) {
		super();
		this.brd_name = brd_name;
	}
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "brd_no")
	private List<Brd_post> brd_posts;
}
