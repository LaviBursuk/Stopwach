package com.example.demo.Service;

import com.example.demo.DAO.StopwatchDao;
import com.example.demo.Entities.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class StopwatchService {

    @Autowired
    private StopwatchDao stopwatchDao;

    public int getSeq() { return stopwatchDao.getSeq(); }

    public Collection<Time> getAllTimes(){ return this.stopwatchDao.getAllTimes(); }

    public Time addTime(Time time){ return stopwatchDao.addTime(time); }

    public Time deleteTime(int id){ return stopwatchDao.deleteTime(id); }

    public void deleteAllTimes() { stopwatchDao.deleteAllTimes(); }
}
