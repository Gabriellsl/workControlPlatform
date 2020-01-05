import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    
  }

  // public timeBegan = null
  // public timeStopped:any = null
  // public stoppedDuration:any = 0
  // public started = null
  // public running = false
  // public blankTime = "00:00.000"
  // public time = "00:00.000"

  // public workTime: any;


  public play = false;
  public interval;
  public sec = 22;
  public hour = 4;
  public min = 37;

  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      this.sec++;
      if(this.sec >= 59){
        this.sec = 0
        this.min++
        if(this.min >= 59){
          this.min = 0;
          this.hour++
        }
      }
    },100)
  }

  pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
    console.log(this.sec);
  }

  // start() {
  //   if(this.running) return;
  //   if (this.timeBegan === null) {
  //       this.reset();
  //       this.timeBegan = new Date();
  //   }
  //   if (this.timeStopped !== null) {
  //     let newStoppedDuration:any = (+new Date() - this.timeStopped)
  //     this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
  //   }
  //   this.started = setInterval(this.clockRunning.bind(this), 10);
  //     this.running = true;
  //   }
  //   stop() {
  //     this.running = false;
  //     this.timeStopped = new Date();
  //     clearInterval(this.started);
  //  }
  //   reset() {
  //     this.running = false;
  //     clearInterval(this.started);
  //     this.stoppedDuration = 0;
  //     this.timeBegan = null;
  //     this.timeStopped = null;
  //     this.time = this.blankTime;
  //   }
  //   zeroPrefix(num, digit) {
  //     let zero = '';
  //     for(let i = 0; i < digit; i++) {
  //       zero += '0';
  //     }
  //     return (zero + num).slice(-digit);
  //   }
  //   clockRunning(){
  //     let currentTime:any = new Date()
  //     let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      
  //     let hour = timeElapsed.getUTCHours()
  //     console.log("currentTime: ",currentTime," timeBegan: ",this.timeBegan,"stoppedDuration: ",this.stoppedDuration);
  //     let min = timeElapsed.getUTCMinutes()
  //     let sec = timeElapsed.getUTCSeconds()
  //     console.log("sec ",sec);
  //     let ms = timeElapsed.getUTCMilliseconds();
  //     this.workTime = timeElapsed;
  //   this.time =
  //     this.zeroPrefix(hour, 2) + ":" +
  //     this.zeroPrefix(min, 2) + ":" +
  //     this.zeroPrefix(sec, 2) + "." +
  //     this.zeroPrefix(ms, 3);
  //   }


}


