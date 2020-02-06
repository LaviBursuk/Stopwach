import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  private baseUrl = '/';

  constructor(private http: HttpClient){}

  public getSeq(){
    return this.http.get(this.baseUrl + 'Seq');
  }

  public getAllTimes(){
    return this.http.get(this.baseUrl + 'Stopwatch');
  }

  public addTime(time){
        return this.http.post(this.baseUrl + 'Stopwatch/', time);
  }

  public deleteTime(id){
        return this.http.delete(this.baseUrl + 'Stopwatch/' + id);
    }

  public deleteAllTimes(){
        return this.http.delete(this.baseUrl + 'Stopwatch/');
  }
}
