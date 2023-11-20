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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "User")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable = false, updatable = false)
	private String id;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private int birth;
	@Column(nullable = false)
	private String gender;
	@Column(nullable = false)
	private String carrier;
	@Column(nullable = false)
	private long tel;
	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private String address;
	@Column(nullable = false)
	private int sms_check;
	@Column(nullable = false)
	private Date recent_date;
	@Column(nullable = false)
	private Date join_date;
	@Column(nullable = false)
	private String Auth;
	@Column(nullable = false)
	private int user_status;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "User")
	private List<Reply> replies;
	private List<Brd_post> brd_posts;
	private List<Ticket> tickets;
	private List<Corporation> corporations;


	
}
