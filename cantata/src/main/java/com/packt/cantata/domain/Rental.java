package com.packt.cantata.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "Rental")
public class Rental {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long rent_no;
	@Column(nullable = false)
	private long cp_no;
	private long plant_no;	
	private Date rent_start;		
	private Date rent_end;	
	private Date rent_date;		
	private Date rent_status;		
	private String rent_pay;
	
	@Builder
	public Rental(long cp_no, long plant_no,
			Date rent_start, Date rent_end, Date rent_date, Date rent_status, String rent_pay) {
		this.cp_no = cp_no;
		this.plant_no = plant_no;
		this.rent_start = rent_start;
		this.rent_end = rent_end;
		this.rent_date = rent_date;
		this.rent_status = rent_status;
		this.rent_pay = rent_pay;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cp_no")
	private Corporation corporation;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plant_no")
	private Plant plant;

}