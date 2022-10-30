package com.example.Plant.Distribution.controller;

import com.example.Plant.Distribution.exception.ResourceNotFoundException;
import com.example.Plant.Distribution.model.Plant;
import com.example.Plant.Distribution.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plant")
public class PlantController {

    @Autowired
    private PlantRepository plantRepository;

    @GetMapping("/getAll")
    public List<Plant> getAllPlants(){
        return plantRepository.findAll();
    }


    @GetMapping("/getSingle/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable long id){
        Plant plant=plantRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Plant not found with "+id)
        );
        return ResponseEntity.ok(plant);
    }

    @PostMapping("/add")
    public Plant createPlant(@RequestBody Plant plant){
        return  plantRepository.save(plant);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Plant> updateFarmer(@PathVariable long id,@RequestBody Plant plant){
        Plant updatedPlant=plantRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Plant not exist with id: "+id)
        );
        updatedPlant.setPlantName(plant.getPlantName());
        updatedPlant.setType(plant.getType());
        updatedPlant.setPrice(plant.getPrice());
        updatedPlant.setCount(plant.getCount());

        plantRepository.save(updatedPlant);
        return ResponseEntity.ok(updatedPlant);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Plant> deletePlant(@PathVariable long id){
        Plant plant=plantRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Plant Not exist with id: "+id)
        );
        plantRepository.delete(plant);
        return ResponseEntity.ok(plant);
    }

}
