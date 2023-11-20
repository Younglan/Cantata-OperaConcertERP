package com.packt.cantata.domain;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
@Getter 
@Setter 
@NoArgsConstructor 
public class Ticket {
	@Id 
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(nullable=false, updatable=false) 
	private String tic_no; 	
	@Column(nullable=false) 
	private Long pt_no;
	private String id;
	private String seat_no;
	private Date tic_date;
	private String tic_status;
	private String tic_pay;
	
	public Ticket(Long pt_no, String id, String seat_no, Date tic_date, String tic_status, String tic_pay) { 
			super();
			this.pt_no = pt_no;
			this.id = id;
			this.seat_no = seat_no;
			this.tic_date = tic_date;
			this.tic_status = tic_status;
			this.tic_pay = tic_pay;
		}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pt_no")
	private perform_time perform_time;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id")
	private User user;
}