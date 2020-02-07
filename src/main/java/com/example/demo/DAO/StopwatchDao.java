package com.example.demo.DAO;

import com.example.demo.Entities.Time;
import com.example.demo.Repository.StopwatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class StopwatchDao {
    private static Map<Integer, Time> times;

    static {
        times = new HashMap<Integer, Time>();
    }

    @Autowired
    private StopwatchRepository stopwatchRepository;

    public Iterable<Time> getAllTimes(){
        return stopwatchRepository.findAll();
    }

    public Time addTime(Time time){
        return stopwatchRepository.save(time);
    }

    public void deleteTime(int id) {
        Time time = new Time();

        if(stopwatchRepository.findById(id).isPresent()){
            time = stopwatchRepository.findById(id).get();
            stopwatchRepository.delete(time);
        }
    }

    public void deleteAllTimes() {
        stopwatchRepository.deleteAll();
    }
}
