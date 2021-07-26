import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  getQuestionsOfQuizOfAdmin(quizId:any){
      return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  getQuestionsOfQuizForTest(quizId:any){
    return this.http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  addQuestion(question:any){
    return this.http.post(`${baseUrl}/question`,question);
  }

  deleteQuestion(id:any){
    return this.http.delete(`${baseUrl}/question/${id}`);
  }

  //Eval - quiz   
  evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }


}
