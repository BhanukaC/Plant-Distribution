package com.example.Plant.Distribution.controller;

import com.example.Plant.Distribution.model.Plant;
import com.example.Plant.Distribution.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plant")
public class PlantController {

    @Autowired
    private PlantRepository plantRepository;
}
