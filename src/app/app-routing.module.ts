import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  AdminComponent } from './pages/admin/admin.component'
import {  EmployeeComponent } from './pages/employee/employee.component'
import {  LoginComponent } from './pages/login/login.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 0} },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 1}},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 1} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
