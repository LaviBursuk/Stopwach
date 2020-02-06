package com.example.demo.Controller;

import com.example.demo.Entities.Time;
import com.example.demo.Service.StopwatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StopwatchController {

    @Autowired
    private StopwatchService stopwatchService;

    @GetMapping("Seq")
    public int getSeq(){ return stopwatchService.getSeq(); }

    @GetMapping("Stopwatch")
    public Collection<Time> getAllTimes(){ return stopwatchService.getAllTimes(); }

    @PostMapping(path = "Stopwatch", consumes = "application/json", produces = "application/json")
    public Time addTime(@RequestBody Time time){
        return stopwatchService.addTime(time);
    }

    @DeleteMapping("Stopwatch/{id}")
    public Time deleteTime(@PathVariable int id){
        return stopwatchService.deleteTime(id);
    }

    @DeleteMapping("Stopwatch")
    public void deleteAllTimes(){ stopwatchService.deleteAllTimes(); }
}
