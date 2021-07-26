import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/test`,questions);
  }
}
