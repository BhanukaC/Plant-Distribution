package com.example.Plant.Distribution.repository;

import com.example.Plant.Distribution.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant, Long> {
}
