package com.example.Plant.Distribution.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.lang.Nullable;

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



    @CreatedDate
    @Column(nullable = false)
    private Date date;
    private double count;

    @Column(nullable = false)
    private String center;



    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "farmerId",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Farmer farmer;



    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name = "plantId",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Plant plant;
}
