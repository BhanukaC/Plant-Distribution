package com.example.Plant.Distribution.repository;

import com.example.Plant.Distribution.model.Distribution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionRepository extends JpaRepository<Distribution,Long> {
}
