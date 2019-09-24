import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	pollId: string;
	oneSurvey: any;
	loggedinUserId: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => {
        console.log(params['pid'])
        this.pollId = params["pid"];
        this.loggedinUserId = params["uid"]
    });
    this.getOneSurveyFromService();
  }

  getOneSurveyFromService(){
  	let observable = this._httpService.getOneSurvey(this.pollId)
  	observable.subscribe((data:any) => {
  		console.log("Got 1 survey from get back", data)
  		this.oneSurvey = data;
  	})
  }

  upVoteFromService(surveyId:any, optionId:any){
  	let observable = this._httpService.upVote(surveyId, optionId)
  	observable.subscribe((data:any) => {
  		console.log("Voted!", data)
  		this.getOneSurveyFromService();
  	})
  }

}
