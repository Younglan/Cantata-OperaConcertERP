package com.packt.cantata.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "performance")
public class performance {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int pf_code;
	private String pf_cate,pf_title, agency, pf_poster, pf_eximg, pf_explan;
	private Date pf_start, pf_end, pf_runtime;
	private int costR, costA, costB, costC, costD;
	private String pf_status;

}
