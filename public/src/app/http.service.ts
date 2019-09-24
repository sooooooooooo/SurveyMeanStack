import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  login(userName:any){
  	return this._http.get("/users/"+userName);
  }

  getSurveys(){
  	return this._http.get("/surveys");
  }

  getUsers(){
  	return this._http.get("/users");
  }

  createPoll(userId:any, newPoll:any){
  	return this._http.post("/users/"+userId+"/surveys", newPoll);
  }

  getOneSurvey(surveyId:any){
  	return this._http.get("/surveys/"+surveyId);
  }

  upVote(sid, oid){
  	return this._http.put("/surveys/"+sid+"/"+oid);
  }

  deleteSurvey(sid:any){
  	return this._http.delete("/surveys/"+sid);
  }
}
