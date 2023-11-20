package com.packt.cantata.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "rental")
public class rental {
	
	@Id
	@Column(nullable = false)
	private long rental_no;
	
	@Column(nullable = false)
	private long cp_no;
	
	@Column(nullable = false)
	private long plant_no;
	
	@Column(nullable = false)
	private Date rent_start;
	
	@Column(nullable = false)
	private Date rent_end;
	
	@Column(nullable = false)
	private Date rent_date;
	
	@Column(nullable = false)
	private Date rent_status;
	
	@Column(nullable = false)
	private String rent_pay;
	
	@Builder
	public rental(long rental_no, long cp_no, long plant_no,
			Date rent_start, Date rent_end, Date rent_date, Date rent_status, String rent_pay) {
		this.rental_no = rental_no;
		this.cp_no = cp_no;
		this.plant_no = plant_no;
		this.rent_start = rent_start;
		this.rent_end = rent_end;
		this.rent_date = rent_date;
		this.rent_status = rent_status;
		this.rent_pay = rent_pay;
	}

}
