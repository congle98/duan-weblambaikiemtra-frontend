import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  categories(){
    return this.http.get(`${baseUrl}/categories`);
  }

  addCategory(category:any){
    return this.http.post(`${baseUrl}/categories`,category);
  }

}


