package com.example.Plant.Distribution.repository;

import com.example.Plant.Distribution.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
}
