import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User} from 'src/app/models/user';
import { Client} from 'src/app/models/client';
import { FormBuilder } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: ''
  };
  userForm;

  clients: Client[];
  client: Client = {
    id: '',
    name: '',
    fantasy: ''
  }
  clientForm;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private clientService: ClientService) { 
      this.userForm = this.formBuilder.group({
        id: '',
        name: '',
        email: '',
        password: '',
        isAdmin: ''
      });

      this.clientForm = this.formBuilder.group({
        id: '',
        name: '',
        fantasy: ''
      });
    }

saveUser(userData){
  
  if(this.user.id == '' || this.user.id == null)
    this.createUser(this.user);
  else
    this.updateUser(this.user);  
}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<User>e.payload.doc.data()
        } as User;
      })
    });

    this.clientService.getClients().subscribe(data => {
      this.clients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<Client>e.payload.doc.data()
        } as Client;
      })
    });
  }

  createUser(user: User) {
    this.userService.createUser(user);
  }

  updateUser(user: User) {
    this.userService.updateUser(user);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }

  editUser(user: User){
    this.userForm.patchValue({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
      });
  }



  saveClient(clientData){
  
    this.client = clientData;
    if(this.client.id == '' || this.client.id == null)
      this.createClient(this.client);
    else
      this.updateClient(this.client);
  }

  createClient(client: Client) {
    this.clientService.createClient(client);
  }

  updateClient(client: Client) {
    this.clientService.updateClient(client);
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id);
    this.client = null;
  }

  editClient(client: Client){
    this.clientForm.patchValue({
        id: client.id,
        name: client.name,
        fantasy: client.fantasy,
      });
  }

}
