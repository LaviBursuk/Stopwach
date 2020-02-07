import { Component, OnInit, OnDestroy } from '@angular/core';
import { StopwatchService } from '../ClientServices/stopwatch.service';
import { Time } from '../Models/Time';

@Component({
  selector: 'app-root',
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.css']
})
export class MainPageComponent implements OnDestroy, OnInit {

    allTimes:any = [];
    newTime =  new Time();

    timerInterval;
    isRunning: boolean = false;
    counter  : number  = 0;
    playButtonText     = 'Play';

    milliseconds: any    = "00";
    seconds     : any    = "00";
    minutes     : any    = "00";
    displayTime : string = "00 : 00 . 00";

    constructor(private service: StopwatchService) { }

    ngOnInit() {
       this.refreshTimes();
    }

    ngOnDestroy() {
       clearInterval(this.timerInterval);
    }

    refreshTimes(){
       this.service.getAllTimes().subscribe((data) => {
          this.allTimes = data;
          this.allTimes.sort((a, b) => { return a.value - b.value});
          this.allTimes.forEach((element) => { element.displayValue = this.calcRealTime(element.value)});
       });
    }

    startTimer() {
      this.isRunning = !this.isRunning;
      if (this.isRunning) {
        this.playButtonText = 'Pause';
        const startTime = Date.now() - this.counter;
        this.timerInterval = setInterval(() => {
          this.counter = (Date.now() - startTime);
          this.displayTime = this.calcRealTime(this.counter);
        });
      } else {
        this.playButtonText = 'Play';
        clearInterval(this.timerInterval);
      }
    }

    saveTime(){
      this.newTime = new Time();
      this.newTime.value = this.counter;
      this.service.addTime(this.newTime).subscribe((data) => { this.updateId(data); });
      this.newTime.displayValue = this.calcRealTime(this.newTime.value);
      this.allTimes.push({"id": this.newTime.value, "value": this.newTime.value, "displayValue": this.newTime.displayValue});
      this.allTimes.sort((a, b) => { return a.value - b.value});
    }

    calcRealTime(counter){
      this.milliseconds = Math.floor((counter / 10) % 100);
      this.seconds      = Math.floor((counter / (10 * 100)) % 60);
      this.minutes      = Math.floor((counter / (10 * 100 * 60)) % 60);


      this.milliseconds = (this.milliseconds < 10) ? "0" + this.milliseconds : this.milliseconds;
      this.seconds      =  (this.seconds < 10) ? "0" + this.seconds : this.seconds;
      this.minutes      =  (this.minutes < 10) ? "0" + this.minutes : this.minutes;

      return this.minutes + " : " + this.seconds + " . " + this.milliseconds;
    }

    removeTime(time){
      this.service.deleteTime(time).subscribe();
      for (let i = 0; i < this.allTimes.length; i++){
          if(this.allTimes[i].id === time.id){
            this.allTimes.splice(i,1);
          }
      }
    }

    updateId(time){
        this.allTimes.forEach((element) => {
            if(element.value === time.value){
                element.id = time.id;
            }
        });
    }

    resetTimer() {
      this.isRunning      = false;
      this.playButtonText = 'Play';
      this.counter        = 0;
      this.milliseconds   = "00";
      this.seconds        = "00";
      this.minutes        = "00";
      this.displayTime    = "00 : 00 . 00";
      this.allTimes       = [];
      clearInterval(this.timerInterval);
      this.service.deleteAllTimes().subscribe();
    }
}
