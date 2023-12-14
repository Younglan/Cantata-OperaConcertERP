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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true) 
@NoArgsConstructor
public class Perform_time {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int pt_no;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pf_code")
	private Performance pfCode;
	
	@Column(nullable=false)
	private Date pt_date;
	
	private Boolean pt_status;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "pt_no")
	private List<Ticket> ticket;

	public Perform_time(int pt_no, Performance pfCode, Date pt_date, Boolean pt_status) {
		super();
		this.pt_no = pt_no;
		this.pfCode = pfCode;
		this.pt_date = pt_date;

		this.pt_status = pt_status;
	}
}
