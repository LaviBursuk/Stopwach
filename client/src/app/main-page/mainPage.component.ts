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
          this.allTimes.forEach((element) => { element.value = this.calcRealTime(element.value)});
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
      this.newTime.value = this.counter;
      this.service.getSeq().subscribe((seq) => {
                this.newTime.id = Number(seq);
                this.service.addTime(this.newTime).subscribe(() => { this.refreshTimes(); });
      });
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

    removeTime(id){
      this.service.deleteTime(id).subscribe(() => { this.refreshTimes(); });
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
      this.service.deleteAllTimes().subscribe(() => { this.refreshTimes(); });
    }
}
