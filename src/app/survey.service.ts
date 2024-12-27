/*
Authors: Russell Bisker, Jonathan Hus, John Smolak
This service facilitates interactions with the API hosted on our EC2 instance for managing surveys. 
It provides methods to create, retrieve, update, delete, and fetch specific surveys by ID by using HttpClient for HTTP requests.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://ec2-44-203-55-113.compute-1.amazonaws.com:8080/api/surveys';

  constructor(private http: HttpClient) { }

  createSurvey(survey: any): Observable<any> {
    return this.http.post(this.apiUrl, survey);
  }

  getSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteSurvey(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSurveyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  updateSurvey(id: number, surveyData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, surveyData);
  }
}
