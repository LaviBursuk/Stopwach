package com.example.demo.DAO;

import com.example.demo.Entities.Time;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class StopwatchDao {
    private static Map<Integer, Time> times;
    public static Integer popo = 5;

    static {
        times = new HashMap<Integer, Time>();
    }

    public Collection<Time> getAllTimes(){
        return this.times.values();
    }

    public Time addTime(Time time){
        return this.times.put(time.getId(), time);
    }

    public Time deleteTime(int id) { return this.times.remove(id); }

    public int getSeq() { return popo++; }

    public void deleteAllTimes() { times = new HashMap<Integer, Time>(); }
}
