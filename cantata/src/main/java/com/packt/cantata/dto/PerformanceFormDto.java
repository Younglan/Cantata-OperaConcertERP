package com.packt.cantata.dto;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PerformanceFormDto {
	private int pfcode;
	private String pfTitle;
	private String pfCate;
	private String agency;
	private String agencyTel;
	private String pfPoster;
	private String pfEximg;
	private String pfExplan;
	private String pfNotice;
	private Date pfStart;
	private Date pfEnd;
	private int pfRuntime;
	private int R;
	private int S;
	private int A;
	private int B;
	private int C;
	private int D;
	private Long plantNo;
	
	@Override
	public String toString() {
		return "PerformanceFormDto [pfcode=" + pfcode + ", pfTitle=" + pfTitle + ", pfCate=" + pfCate + ", agency="
				+ agency + ", agencyTel=" + agencyTel + ", pfPoster=" + pfPoster + ", pfEximg=" + pfEximg
				+ ", pfExplan=" + pfExplan + ", pfNotice=" + pfNotice + ", pfStart=" + pfStart + ", pfEnd=" + pfEnd
				+ ", pfRuntime=" + pfRuntime + ", R=" + R + ", S=" + S + ", A=" + A + ", B=" + B + ", C=" + C + ", D="
				+ D + ", plantNo=" + plantNo + "]";
	}
}
