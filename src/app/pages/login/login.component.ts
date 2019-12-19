import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private router: Router,
              private formBuilder: FormBuilder) {
   }

   loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    facebookToken: ['', null],
    grant_type: ['password', null]
  });

  ngOnInit() {

  }

  public onSubmit(user):void{
    console.log("testando"+user);
  }
}
