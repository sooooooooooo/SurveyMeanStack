import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpService } from "./http.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    DetailComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
