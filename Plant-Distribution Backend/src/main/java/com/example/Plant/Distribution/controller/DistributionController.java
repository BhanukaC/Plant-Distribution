package com.example.Plant.Distribution.controller;

import com.example.Plant.Distribution.exception.ResourceNotFoundException;
import com.example.Plant.Distribution.model.Distribution;
import com.example.Plant.Distribution.repository.DistributionRepository;
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
        return  distributionRepository.save(distribution);
    }

}
