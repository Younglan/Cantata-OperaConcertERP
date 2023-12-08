package com.packt.cantata.domain;

import java.util.ArrayList;
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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
	private long pfCode;
		
	@Column(nullable = true)
	private String pfCate, pfTitle, agency, agencyTel, pfPoster, pfEximg;
	
	@Column(nullable = true)
	@Lob
	private String	pfExplan, pfNotice;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date pfStart;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date pfEnd;
	
	private int pfRuntime, R, S, A, B, C, D;
	
//	@ColumnDefault("1")
	@Column(columnDefinition = "boolean default true",nullable = false)
	private Boolean pfStatus = true;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_no")
	private Plant plant_no;

	@OneToMany(mappedBy = "performance", cascade = CascadeType.REMOVE)
    @JsonBackReference(value = "performance-files")
    private List<File> files = new ArrayList<>();
	
	
	public Performance( String pfCate, String pfTitle, String agency,String agencyTel, String pfPoster, String pfEximg,
			String pfExplan, String pfNotice, Date pfStart, Date pfEnd, int pfRuntime, int R, int S,int A, int B, int C,
			int costD) {
		super();
		
		this.pfCate = pfCate;
		this.pfTitle = pfTitle;
		this.agency = agency;
		this.agencyTel = agencyTel;
		this.pfPoster = pfPoster;
		this.pfEximg = pfEximg;
		this.pfExplan = pfExplan;
		this.pfNotice = pfNotice;
		this.pfStart = pfStart;
		this.pfEnd = pfEnd;
		this.pfRuntime = pfRuntime;
		this.R = R;
		this.S = S;
		this.A = A;
		this.B = B;
		this.C = C;
		this.D = D;
//		this.pfStatus = pfStatus;
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
				+ pfNotice + ", pfStart=" + pfStart + ", pfEnd=" + pfEnd + ", pfRuntime=" + pfRuntime + ", R="
				+ R + ", S=" + S + ", A=" + A + ", B=" + B + ", C=" + C + ", D=" + D
				+ ", pfStatus=" + pfStatus + ", plant_no=" + plant_no + ", perform_times=" + perform_times + "]";
	}
	public Performance(String pfCate, String pfTitle, String agency, int pfRuntime) {
		super();
		this.pfCate = pfCate;
		this.pfTitle = pfTitle;
		this.agency = agency;
		this.pfRuntime = pfRuntime;
	}
}
