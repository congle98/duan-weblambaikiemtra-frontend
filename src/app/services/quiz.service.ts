import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  quizzes(){
    return this.http.get(`${baseUrl}/quiz`);
  }

  addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz`,quiz);
  }

  deleteQuiz(id:any){
    return this.http.delete(`${baseUrl}/quiz/${id}`);
  }
  getQuizById(id:any){
    return this.http.get(`${baseUrl}/quiz/${id}`);
  }

  updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz`,quiz);
  }

  getQuizzesOfCategory(cateId:any){
    return this.http.get(`${baseUrl}/quiz/category/${cateId}`);
  }

  getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }

  getActiveQuizzesOfCategory(cateId:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cateId}`);
  }
}
