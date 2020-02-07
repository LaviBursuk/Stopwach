package com.example.demo.Service;

import com.example.demo.DAO.StopwatchDao;
import com.example.demo.Entities.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StopwatchService {

    @Autowired
    private StopwatchDao stopwatchDao;

    public Iterable<Time> getAllTimes(){ return this.stopwatchDao.getAllTimes(); }

    public Time addTime(Time time){ return stopwatchDao.addTime(time); }

    public void deleteTime(int id){ stopwatchDao.deleteTime(id); }

    public void deleteAllTimes() { stopwatchDao.deleteAllTimes(); }
}
