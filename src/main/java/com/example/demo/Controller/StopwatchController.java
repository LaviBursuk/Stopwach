package com.example.demo.Controller;

import com.example.demo.Entities.Time;
import com.example.demo.Service.StopwatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StopwatchController {

    @Autowired
    private StopwatchService stopwatchService;

    @GetMapping("Stopwatch")
    public Iterable<Time> getAllTimes(){ return stopwatchService.getAllTimes(); }

    @PostMapping(path = "Stopwatch", consumes = "application/json", produces = "application/json")
    public Time addTime(@RequestBody Time time){ return stopwatchService.addTime(time); }

    @DeleteMapping("Stopwatch/{id}")
    public void deleteTime(@PathVariable int id){ stopwatchService.deleteTime(id); }

    @DeleteMapping("Stopwatch")
    public void deleteAllTimes(){ stopwatchService.deleteAllTimes(); }
}
