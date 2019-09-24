import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loggedInUser: any;
	errMsgCreate = [];
  loggedinUserId: string;

  constructor(private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  	this.loggedInUser = {name: ""};
  }

  loginFromService(){
  	let observable = this._httpService.login(this.loggedInUser.name)
  	observable.subscribe((data:any) => {
  		console.log("Found this user from get back", data, typeof data)
  		// if("errors" in data){
    //     this.errMsgCreate = [];
    //     for(let error in data.errors){
    //       console.log(error)
    //       console.log(data.errors[error]["message"])
    //       this.errMsgCreate.push(data.errors[error]["message"]);
    //     }
	   //  } else 
	    if(data==null){
	    	this.errMsgCreate = [];
	    	this.errMsgCreate.push("You cannot be logged in. Please try again.");
	    } else{
        console.log(data)
        this.loggedinUserId = data._id;
        this.errMsgCreate = [];
        this.loggedInUser = {name: ""};
        this.goToLists();
	    }
  	})
  }

  goToLists(){
  	this._router.navigate(["dashboard/"+this.loggedinUserId]);
  }

}
