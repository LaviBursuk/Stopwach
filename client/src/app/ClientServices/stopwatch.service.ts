import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  private baseUrl = '/';

  constructor(private http: HttpClient){}

  public getAllTimes(){
    return this.http.get(this.baseUrl + 'Stopwatch');
  }

  public addTime(time){
        return this.http.post(this.baseUrl + 'Stopwatch/', time);
  }

  public deleteTime(time){
        return this.http.delete(this.baseUrl + 'Stopwatch/' + time.id);
    }

  public deleteAllTimes(){
        return this.http.delete(this.baseUrl + 'Stopwatch/');
  }
}
