package com.example.Plant.Distribution.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import javax.persistence.*;
import java.util.Date;




@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "distribution")
public class Distribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


 
    private Date date;
    private double count;

    @Column(nullable = false)
    private String center;

    private String userName;


    private long farmerId;
    private long plantId;




}
