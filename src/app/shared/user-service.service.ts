import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from './userModel.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  baseUrl='https://jsonplaceholder.typicode.com/users'
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl)
  }

  addUsers(obj:User){
    return this.http.post(this.baseUrl,obj)
  }

  updateUser(obj:User,id:number){
    return this.http.put(`${this.baseUrl}/${id}`,obj)
  }

  deleteUser(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
