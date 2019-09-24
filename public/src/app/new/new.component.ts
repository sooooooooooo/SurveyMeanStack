import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	loggedinUserId: string;
	newPoll: any;
	errMsgCreate = [];

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => {
        console.log(params['id'])
        this.loggedinUserId = params["id"];
    });
    this.newPoll = {question: "", option1: "", option2: "", option3: "", option4: ""}
  }

  createPollFromService(){
  	let observable = this._httpService.createPoll(this.loggedinUserId, this.newPoll)
  	observable.subscribe((data:any) => {
  		console.log("Created 1 survey from post back", data)
  		if("errors" in data){
	        this.errMsgCreate = [];
	        for(let error in data.errors){
	          console.log(error)
	          console.log(data.errors[error]["message"])
	          this.errMsgCreate.push(data.errors[error]["message"]);
	        }
		    } else{
	        console.log(data)
	        this.errMsgCreate = [];
	        this.newPoll = {question: "", option1: "", option2: "", option3: "", option4: ""}
	        this.goToLists();
	    }
  	})
  }

  goToLists(){
  	this._router.navigate(["dashboard/"+this.loggedinUserId]);
  }

}
