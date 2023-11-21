package com.packt.cantata.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

	@Id
	@Column(nullable = false, updatable = false)
	private String id;
	@Column(nullable = false)
	private String password;
	private String name;
	private int birth;	
	private String gender;
	private String carrier;	
	private long tel;	
	private String email;	
	private String address;
	private Boolean sms_check;
	private Date recent_date;
	private Date join_date;
	private String Auth;
	private Boolean user_status;
	public User(String id, String password, String Auth) {
		super();
		this.id = id;
		this.password = password;
		this.Auth = Auth;
	}
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "id")
	private List<Corporation> corporations;
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "id")
	private List<Reply> replies;
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "id")
	private List<Brd_post> brd_posts;
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "id")
	private List<Ticket> tickets;
	
	
}
