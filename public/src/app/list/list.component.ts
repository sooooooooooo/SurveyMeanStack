import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	loggedinUserId: string;
	allSurveys: any;
	allUsers: any;

  constructor(private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => {
        console.log(params['id'])
        this.loggedinUserId = params["id"];
    });
  	this.getSurveysFromService();
  	this.getUsersFromService();
  }

  getSurveysFromService(){
  	let observable = this._httpService.getSurveys()
  	observable.subscribe((data:any) => {
  		console.log("Got all surveys from get back", data)
  		this.allSurveys = data;
  	})
  }

  getUsersFromService(){
  	let observable = this._httpService.getUsers()
  	observable.subscribe((data:any) => {
  		console.log("Got all users from get back", data.allUsers)
  		this.allUsers = data.allUsers
      console.log(this.allUsers)
  	})
  }

  searchByQuestion(e){
    console.log(e.target.value)
    let searchTerm = e.target.value
    let searchResults = []
    let surveyObservable = this._httpService.getSurveys()
    surveyObservable.subscribe((data:any) => {
      console.log(data)
      for(let survey of data){
        console.log(survey.question.toLowerCase())
        console.log(searchTerm.toLowerCase())
        if(survey.question.toLowerCase()==searchTerm.toLowerCase()){
          console.log("got here!")
          searchResults.push(survey);
          this.allSurveys = searchResults;
        }
      }
    })

    let searchTermUser = e.target.value
    let searchResultsUser = []
    let userObservable = this._httpService.getUsers()
    userObservable.subscribe((data:any) => {
      console.log(data.allUsers)
      for(let user of data.allUsers){
        console.log(user.name.toLowerCase())
        console.log(searchTermUser.toLowerCase())
        if(user.name.toLowerCase()==searchTermUser.toLowerCase()){
          console.log("got here!", user.polls)
          searchResultsUser = user.polls;
          this.allSurveys = searchResultsUser;
        }
      }
    })

    if(searchTerm==""){
      this.getSurveysFromService();
    }
    if(searchTermUser==""){
      this.getSurveysFromService();
    }
  }

  // searchByUser(e){
  //   console.log(e.target.value)
  //   let searchTerm = e.target.value
  //   let searchResults = []
  //   let userObservable = this._httpService.getUsers()
  //   userObservable.subscribe((data:any) => {
  //     console.log(data.allUsers)
  //     for(let user of data.allUsers){
  //       console.log(user.name.toLowerCase())
  //       console.log(searchTerm.toLowerCase())
  //       if(user.name.toLowerCase()==searchTerm.toLowerCase()){
  //         console.log("got here!", user.polls)
  //         searchResults = user.polls;
  //         // console.log(`line 112 ${this.cakes}`)
  //       }
  //     }
  //     this.allSurveys = searchResults
  //   })
  //   if(searchTerm==""){
  //     this.getSurveysFromService();
  //   }
  // }

  deleteSurveyFromService(sid){
    let observable = this._httpService.deleteSurvey(sid)
    observable.subscribe((data:any) => {
      console.log("Deleted 1 survey from delete back", data)
      this.getSurveysFromService();
    })
  }

}
