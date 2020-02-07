package com.example.demo.Repository;

import com.example.demo.Entities.Time;
import org.springframework.data.repository.CrudRepository;

public interface StopwatchRepository extends CrudRepository<Time, Integer> {

}

