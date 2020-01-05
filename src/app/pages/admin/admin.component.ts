import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormBuilder } from '@angular/forms';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

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

  constructor(private userService: UserService,
    private formBuilder: FormBuilder) { 
      this.userForm = this.formBuilder.group({
        id: '',
        name: '',
        email: '',
        password: '',
        isAdmin: ''
      });
    }

onSubmit(userData){
  
  // this.user.email = userData['email'];
  // this.user.name = userData['name'];
  // this.user.password = userData['password'];
  // this.user.isAdmin = userData['isRoot'];
  this.user = userData;

  // this.userForm.patchValue({
  //   name: "this.question.user",
  //   email: "this.question.questioning"
  // });
  if(this.user.id == '' || this.user.id == null)
    this.create(this.user);
  else
    this.update(this.user);
  //this.create(this.user);
  
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
  }

  create(user: User) {
    this.userService.createUser(user);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }

  delete(id: string) {
    this.userService.deleteUser(id);
  }

  edit(user: User){
    this.userForm.patchValue({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin
      });
  }

}
