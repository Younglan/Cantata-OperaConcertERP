package com.packt.cantata.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

	@Id
//	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	@Column(nullable = false, updatable = false)
	private String id;
	@Column(nullable = false)
	private String password;
	private String username;
	
	private LocalDate birth;	
	private String gender;

	private String tel;	
	private String email;	
	private String address;

	@CreatedDate
	private Date recent_date;
	@CreatedDate
	private Date join_date;

	private String Auth;
	
	
	public User(String id, String username, String password, String Auth) {
		super();
		this.id = id;
		this.username=username;
		this.password = password;
		this.Auth = Auth;
	}
	
	public User(String id, String password, String username, String gender, String tel, String email, String address, LocalDate birth) {
		super();
		this.id = id;
		this.password = password;
		this.username = username;
		this.gender = gender;
		this.tel = tel;
		this.email = email;
		this.address = address;
		this.birth = birth;
	}
	@PrePersist
    public void prePersist() {
        this.Auth = this.Auth == null ? "USER" : this.Auth;
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
