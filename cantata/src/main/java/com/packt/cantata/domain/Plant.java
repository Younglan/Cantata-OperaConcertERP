package com.packt.cantata.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "Plant")
public class Plant {
	@Id 
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(nullable=false, updatable=false) 
	private String plant_no;
	private String plant_name;
	private String plant_use;
	private String plant_detail;
	private int capacity;
	private String plant_mainimg;
	private String plant_subimg1;
	private String plant_subimg2;
	private long plant_charge;
	private String plant_sub;
	private String plant_status;
	private String floor;
	
	public Plant(String plant_no, String plant_name, String plant_use, String plant_detail
			, int capacity, String plant_mainimg, String plant_subimg1, String plant_subimg2
			, long plant_charge, String plant_sub, String plant_status, String floor) {
		this.plant_no = plant_no;
		this.plant_name = plant_name;
		this.plant_use = plant_use;
		this.plant_detail = plant_detail;
		this.capacity = capacity;
		this.plant_mainimg = plant_mainimg;
		this.plant_subimg1 = plant_subimg1;
		this.plant_subimg2 = plant_subimg2;
		this.plant_charge = plant_charge;
		this.plant_sub = plant_sub;
		this.plant_status = plant_status;
		this.floor = floor;
	}
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "plant_no")
	private List<Rental> rentals;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "plant_no")
	private List<Performance> performs;
}
