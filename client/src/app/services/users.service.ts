import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private router:Router,private http:HttpClient) { }

  plotList : Array<any>= [];

  getUsers(){

   return this.http.get(environment.MOCK_USERS_URL).pipe(
    map(
      (response : any )=> response.users
    ))
    
  }

  registerNewUser(userData: any){
    let url = `${environment.BACKEND_SERVER}/register`;
    return this.http.post(url,userData).pipe(
      map(
        (response : any )=> response
      ))
  }

  login(loginCredentials: any){
    let url = `${environment.BACKEND_SERVER}/login`;
    return this.http.post(url,loginCredentials).pipe(
      map(
        (response : any )=> response
      ))
  }

  setToken(token: string){
    sessionStorage.setItem('pasToken', token);
  }

  getToken(){
    return sessionStorage.getItem('pasToken');
  }

  setUserData(userdata: any){

    sessionStorage.setItem('userData', JSON.stringify(userdata));
  }

  getUserData(){
    let userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : {};
  }

  clearToken(){
    sessionStorage.clear();
  }

  isUserLoggedIn(){
    return this.getToken() ? true : false;
  }

}
