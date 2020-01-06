import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { ClientWork } from 'src/app/models/work';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  clientWorks: ClientWork[] = [];
  haveWork = "S0";

  userSelected: User;
  showUserDetails: boolean;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.showUserDetails = false;
    this.userSelected = null;

    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<User>e.payload.doc.data()
        } as User;
      }).filter(user => user.isAdmin == "0");
    }); 
  }

  cleanSelection(){
    this.showUserDetails = false;
    this.userSelected = null;
  }

  async selectUser(user: User){
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

    this.userSelected = user;
    this.showUserDetails = true;
    return clients;
  }

  goAdm(){
    this.router.navigate(['/admin']);
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/']);
  }

}