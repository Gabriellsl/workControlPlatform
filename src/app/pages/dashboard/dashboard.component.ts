import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase';
import { ClientWork } from 'src/app/models/work';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  clientWorks: ClientWork[] = [];
  haveWork = "S0";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<User>e.payload.doc.data()
        } as User;
      })
    }); 
  }

  async selectUser(user){
    var haveWork = 0;
    var clients = await this.userService.getClients(user.id).subscribe(data => {
      this.clientWorks = data.map(e => {
        return {
            id: e.payload.doc.id,
            ...<ClientWork>e.payload.doc.data()
          } as ClientWork;
      })
      
      return this.clientWorks.length;
    });

    return clients;
  }

  
}
