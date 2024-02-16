import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { CrouselComponent } from './crousel/crousel.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'department', component:DepartmentComponent},
  {path:'crousel',component:CrouselComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
