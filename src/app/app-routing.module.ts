import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  AdminComponent } from './pages/admin/admin.component'
import {  EmployeeComponent } from './pages/employee/employee.component'
import {  LoginComponent } from './pages/login/login.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
