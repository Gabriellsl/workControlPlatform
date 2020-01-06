import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { ClientWork } from 'src/app/models/work';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  currentUser: User;
  notNew = true;
  clients: Client[];
  selectedClient: Client;
  clientWork: ClientWork = {
    id: '',
    name: '',
    hour: 0,
    min: 0,
    sec: 0
  };
  working = false;

  constructor(
    private clientService: ClientService,
    private userService: UserService,
    private router: Router) 
  {
    this.selectedClient = null;
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<Client>e.payload.doc.data()
        } as Client;
      })
    });
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/']);
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
  public sec = 0;
  public hour = 0;
  public min = 0;

  startTimer() {
    if(this.play == false){
    this.play = true;
    this.interval = setInterval(() => {
      this.sec++;
      if (this.sec >= 59) {
        this.sec = 0
        this.min++
        if (this.min >= 59) {
          this.min = 0;
          this.hour++
        }
      }
    }, 1000)
  }
  }

  pauseTimer() {
    if(this.play == true){
      this.play = false;
      clearInterval(this.interval);
    }
    
  }


  endWork() {
    this.pauseTimer();

    this.clientWork.name = this.selectedClient.name;
    this.clientWork.hour = this.hour;
    this.clientWork.min = this.min;
    this.clientWork.sec = this.sec;
    
    if (this.notNew)
      this.userService.updateClient(this.clientWork, this.currentUser.id, this.selectedClient.id);
    else
      this.userService.addClient(this.clientWork, this.currentUser.id, this.selectedClient.id);

    this.working = false;
  }

  async selectClient(client: Client) {
    this.selectedClient = client;
    this.working = true;
    this.notNew = await this.findClient();
    if (this.notNew) {
      this.hour = this.clientWork.hour;
      this.min = this.clientWork.min;
      this.sec = this.clientWork.sec;
    } else {
      this.hour = 0;
      this.min = 0;
      this.sec = 0;
    }
  }

  async findClient() {
    var clientData;
    var currentUser = JSON.parse(localStorage.getItem("user"));
    const val = await this.userService.getClient(currentUser.id, this.selectedClient.id).get()
      .then(function (doc) {
        if (doc.exists) {

          // doc.data() is never undefined for query doc snapshots
          clientData = <ClientWork>doc.data();
          // userId = doc.id;

        } else {
          return null;
        }
      })
      .catch(function (error) {
        return null;
      });

    if (clientData != null) {
      this.clientWork = clientData;
      return true;
    } else {
      return false;
    }
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


