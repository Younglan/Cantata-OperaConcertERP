package com.packt.cantata.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.packt.cantata.domain.Performance;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Perform_time {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pt_no;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pf_code")
	private Performance performance;
	
	private Date pt_date, pt_time;
	
	private String pt_status;

	public Perform_time(int pt_no, Performance performance, Date pt_date, Date pt_time, String pt_status) {
		super();
		this.pt_no = pt_no;
		this.performance = performance;
		this.pt_date = pt_date;
		this.pt_time = pt_time;
		this.pt_status = pt_status;
	}

}
