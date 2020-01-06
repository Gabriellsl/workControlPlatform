import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Client } from 'src/app/models/client';
import { FormBuilder } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  manageEmployee: boolean;
  manageClients: boolean;
  newClient: boolean;
  newEmployee: boolean;

  currentUser: User;
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
    private clientService: ClientService,
    private router: Router) 
  {

    this.manageEmployee = false;
    this.manageClients = false;

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
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }

  saveUser(userData) {
    this.user = userData;

    if(!this.user.name || this.user.name.length < 1){
      alert("Preencha o nome do funcionário");
      return;
    }

    if(!this.user.email || this.user.email.length < 1){
      alert("Preencha o email do funcionário");
      return;
    }

    if(!this.user.password || this.user.password.length < 1){
      alert("Preencha a senha do funcionário");
      return;
    }

    if(!this.user.isAdmin || this.user.isAdmin.length < 1){
      alert("Selecione o tipo do funcionário");
      return;
    }

    if (this.user.id == '' || this.user.id == null)
      this.createUser(this.user);
    else
      this.updateUser(this.user);

    alert("Operação realizada com sucesso!");
    this.cancelNewEmployee();
  }

  createUser(user: User) {
    this.userService.createUser(user);
  }

  updateUser(user: User) {
    this.userService.updateUser(user);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
    this.user = null;
  }

  editUser(user: User) {
    this.newEmployee = true;

    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin
    });
  }

  cancelNewEmployee(){
    this.newEmployee = false;
    this.userForm.patchValue({
      id: "",
      name: "",
      email: "",
      password: "",
      isAdmin: ""
    });
  }

  saveClient(clientData) {
    this.client = clientData;

    if(!this.client.name || this.client.name.length < 1){
      alert("Preencha o nome do cliente");
      return;
    }

    if(!this.client.fantasy || this.client.fantasy.length < 1){
      alert("Preencha o nome fantasia do cliente");
      return;
    }

    if (this.client.id == '' || this.client.id == null)
      this.createClient(this.client);
    else
      this.updateClient(this.client);

    alert("Operação realizada com sucesso!");
    this.cancelNewClient();
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

  editClient(client: Client) {
    this.newClient = true;

    this.clientForm.patchValue({
      id: client.id,
      name: client.name,
      fantasy: client.fantasy,
    });
  }

  cancelNewClient(){
    this.newClient = false;
    this.clientForm.patchValue({
      id: "",
      name: "",
      fantasy: "",
    });
  }

  showEmployee() {
    this.manageClients = false;
    this.manageEmployee = !this.manageEmployee;
  }

  showClient() {
    this.manageEmployee = false;
    this.manageClients = !this.manageClients;
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(["/"]);
  }

  goDash(){
    this.router.navigate(["/dashboard"]);
  }

}
