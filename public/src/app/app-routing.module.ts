import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
	{path: "login", component: LoginComponent},
	{path: "dashboard/:id", component: ListComponent},
	{path: "poll/:pid/:uid", component: DetailComponent},
	{path: "new/:id", component: NewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
