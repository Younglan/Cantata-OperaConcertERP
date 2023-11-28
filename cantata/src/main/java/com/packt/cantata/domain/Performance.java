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

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Performance {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pf_code;
	@Column(nullable = false)
	private String pf_cate,pf_title, agency, pf_poster, pf_eximg, pf_explan, pf_notice;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date pfEnd;
	
	private int pfRuntime, costRa, costA, costB, costC, costD;
	
	private Boolean pfStatus;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_no")
	private Plant plant_no;

	public Performance(int pf_code, String pf_cate, String pf_title, String agency, String pf_poster, String pf_eximg,
			String pf_explan, Date pf_start, Date pf_end, Date pf_runtime, int costR, int costA, int costB, int costC,
			int costD, Boolean pf_status, Plant plant_no,String pf_notice) {
		super();
		this.pf_code = pf_code;
		this.pf_cate = pf_cate;
		this.pf_title = pf_title;
		this.agency = agency;
		this.pfPoster = pfPoster;
		this.pfEximg = pfEximg;
		this.pfExplan = pfExplan;
		this.pfNotice = pfNotice;
		this.pfStart = pfStart;
		this.pfEnd = pfEnd;
		this.pfRuntime = pfRuntime;
		this.costRa = costRa;
		this.costA = costA;
		this.costB = costB;
		this.costC = costC;
		this.costD = costD;
		this.pfStatus = pfStatus;
//		this.plant_no = plant_no;	
	}
	public Performance(String pfCate, String pfTitle, String agency, String pfPoster, String pfExplan) {
		super();
		this.pfCate = pfCate;
		this.pfTitle = pfTitle;
		this.agency = agency;
		this.pfPoster = pfPoster;
		this.pfExplan = pfExplan;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pfCode")
	private List<Perform_time> perform_times;



	@Override
	public String toString() {
		return "Performance [pfCode=" + pfCode + ", pfCate=" + pfCate + ", pfTitle=" + pfTitle + ", agency=" + agency
				+ ", pfPoster=" + pfPoster + ", pfEximg=" + pfEximg + ", pfExplan=" + pfExplan + ", pfNotice="
				+ pfNotice + ", pfStart=" + pfStart + ", pfEnd=" + pfEnd + ", pfRuntime=" + pfRuntime + ", costRa="
				+ costRa + ", costA=" + costA + ", costB=" + costB + ", costC=" + costC + ", costD=" + costD
				+ ", pfStatus=" + pfStatus + ", plant_no=" + plant_no + ", perform_times=" + perform_times + "]";
	}
}



