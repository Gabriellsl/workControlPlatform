import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  AdminComponent } from './pages/admin/admin.component'
import {  EmployeeComponent } from './pages/employee/employee.component'
import {  LoginComponent } from './pages/login/login.component'


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'employee', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
