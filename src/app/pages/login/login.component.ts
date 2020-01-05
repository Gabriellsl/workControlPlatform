import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, EmailValidator, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import {User} from './../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: '',
  }

  userLogin: User = {
    id : '',
    name: '',
    email: '',
    password: '',
    isAdmin: '',
  }

  loginForm;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      isRoot: ''
    });
    localStorage.setItem("user",null);
  }



  ngOnInit() {
    
  }

  public async onSubmit(userData) {
    //console.log(userData);
    //var val = this.loginService.cadastrar(userData['email'], userData['password']);
    //console.log(val);
    this.user.email = userData['email'];
    this.user.name = userData['name'];
    this.user.password = userData['password'];
    this.user.isAdmin = userData['isRoot'];
    //this.userService.addUser(this.user);
    var log = await this.findLogin();
    console.log(log);
    var user = JSON.parse(localStorage.getItem("user"));
    if(user != null){
    user["isAdmin"] == 0 ? this.router.navigate(['/employee']) : this.router.navigate(['/admin']);
    }
    
  }

  async findLogin() {
    var userLog;
    var userId;
    const val = await this.loginService.login(this.user.email, this.user.password).get()
      .then(function (querySnapshot) {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            userLog = <User>doc.data();
            userId = doc.id;
          });
        }else{
          userLog = null;
          console.log("n tem");
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
        userLog = null;
      });

      if(userLog != null){
        if(userLog.email == this.user.email && userLog.password == this.user.password){
          userLog.id = userId;
          this.user = userLog;
          localStorage.setItem("user",JSON.stringify(this.user));
          return true;
        }else{
          return false;
        }
      }
      
  }

}
