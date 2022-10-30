package com.example.Plant.Distribution.controller;

import com.example.Plant.Distribution.exception.ResourceNotFoundException;
import com.example.Plant.Distribution.model.Farmer;
import com.example.Plant.Distribution.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
@CrossOrigin(origins = "http://localhost:3000")
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    @GetMapping("/getAll")
    public List<Farmer> getAllFarmers(){
        return farmerRepository.findAll();
    }


    @GetMapping("/getSingle/{id}")
    public ResponseEntity<Farmer> getFarmerById(@PathVariable long id){
        Farmer farmer=farmerRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Farmer not found with "+id)
        );
        return ResponseEntity.ok(farmer);
    }

    @PostMapping("/add")
    public Farmer createFarmer(@RequestBody Farmer farmer){
        return  farmerRepository.save(farmer);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Farmer> updateFarmer(@PathVariable long id,@RequestBody Farmer farmer){
        Farmer updatedFarmer=farmerRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Farmer not exist with id: "+id)
        );
        updatedFarmer.setFirstName(farmer.getFirstName());
        updatedFarmer.setLastName(farmer.getLastName());
        updatedFarmer.setAddress(farmer.getAddress());
        updatedFarmer.setAreaOfCropland(farmer.getAreaOfCropland());
        updatedFarmer.setNicNo(farmer.getNicNo());
        updatedFarmer.setType(farmer.getType());

        farmerRepository.save(updatedFarmer);

        return ResponseEntity.ok(updatedFarmer);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Farmer> deleteFarmer(@PathVariable long id){
        Farmer farmer=farmerRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Farmer Not exist with id: "+id)
        );
        farmerRepository.delete(farmer);
        return ResponseEntity.ok(farmer);
    }







}
