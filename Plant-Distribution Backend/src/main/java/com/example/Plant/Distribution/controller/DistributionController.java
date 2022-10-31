package com.example.Plant.Distribution.controller;

import com.example.Plant.Distribution.exception.ResourceNotFoundException;
import com.example.Plant.Distribution.model.Distribution;
import com.example.Plant.Distribution.model.Plant;
import com.example.Plant.Distribution.repository.DistributionRepository;
import com.example.Plant.Distribution.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/distribution")
@CrossOrigin(origins = "http://localhost:3000")
public class DistributionController {

    @Autowired
    private DistributionRepository distributionRepository;
    @Autowired
    private PlantRepository plantRepository;


    @GetMapping("/getAll")
    public List<Distribution> getAllDistribution(){
        return distributionRepository.findAll();
    }


    @GetMapping("/getSingle/{id}")
    public ResponseEntity<Distribution> getFarmerById(@PathVariable long id){
        Distribution distribution=distributionRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Distribution not found with "+id)
        );
        return ResponseEntity.ok(distribution);
    }


    @PostMapping("/add")
    public Distribution createDistribution(@RequestBody Distribution distribution){
        distribution.setDate(new Date());
        Plant updatedPlant=plantRepository.findById(distribution.getPlantId()).orElseThrow(
                ()->new ResourceNotFoundException("Plant not found with "+distribution.getPlantId())
        );
        updatedPlant.setCount(updatedPlant.getCount()-distribution.getCount());
        distribution.setPricePerUnit(updatedPlant.getPrice());
        distribution.setTotal(updatedPlant.getPrice()*distribution.getCount());
        plantRepository.save(updatedPlant);
        return  distributionRepository.save(distribution);
    }

}
