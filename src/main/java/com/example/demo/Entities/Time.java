package com.example.demo.Entities;

public class Time {
    private int id;
    private long value;

    public Time() {}

    public Time(int id, long value) {
        this.value = value;
    }

    public int getId() { return id; }

    public void setId(int id) {
        this.id = id;
    }

    public long getValue() { return value; }

    public void setValue(long value) {
        this.value = value;
    }
}
