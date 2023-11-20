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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "performance")
public class Performance {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pf_code;
	
	private String pf_cate,pf_title, agency, pf_poster, pf_eximg, pf_explan;
	
	private Date pf_start, pf_end, pf_runtime;
	
	private int costR, costA, costB, costC, costD;
	
	private String pf_status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_no")
	private Plant plant;

	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "performance")
	private List<Perform_time> perform_time;


	public Performance(int pf_code, String pf_cate, String pf_title, String agency, String pf_poster, String pf_eximg,
			String pf_explan, Date pf_start, Date pf_end, Date pf_runtime, int costR, int costA, int costB, int costC,
			int costD, String pf_status, Plant plant, List<Perform_time> perform_time) {
		super();
		this.pf_code = pf_code;
		this.pf_cate = pf_cate;
		this.pf_title = pf_title;
		this.agency = agency;
		this.pf_poster = pf_poster;
		this.pf_eximg = pf_eximg;
		this.pf_explan = pf_explan;
		this.pf_start = pf_start;
		this.pf_end = pf_end;
		this.pf_runtime = pf_runtime;
		this.costR = costR;
		this.costA = costA;
		this.costB = costB;
		this.costC = costC;
		this.costD = costD;
		this.pf_status = pf_status;
		this.plant = plant;
		this.perform_time = perform_time;
	}
	
	
}
