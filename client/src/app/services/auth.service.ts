import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus') || 'false')
  private role = localStorage.getItem('role') || ''
  private token = localStorage.getItem('token') || ''
  private userId = localStorage.getItem('userId') || ''
  private email = localStorage.getItem('email') || ''

  constructor() {};

  getLoggedInStatus () :boolean {
    return JSON.parse(localStorage.getItem('loggedInStatus') || this.loggedInStatus)
  }

  setLoggedInStatus (valu :boolean) {
    localStorage.setItem('loggedInStatus' , valu+'') ;
    this.loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus'));
  }

  setToken (valu : string ){
    this.token = valu;
    localStorage.setItem('token',valu)
  }

  getToken() : string{
    return localStorage.getItem('token') || this.token
  }

  setRole (valu : string ){
    this.role = valu;
    localStorage.setItem('role',valu)
  }

  getRole() : string{
    return localStorage.getItem('role') || this.role
  }

  setEmail (valu : string ){
    this.email = valu;
    localStorage.setItem('email',valu)
  }

  getEmail() : string{
    return localStorage.getItem('email') || this.email
  }

  setUserId (valu : string ){
    this.userId = valu;
    localStorage.setItem('userId',valu)
  }

  getUserId() : string{
    return localStorage.getItem('userId') || this.userId
  }

  deconnexion(){
    this.setLoggedInStatus(false);
    this.token='';
    localStorage.removeItem('token');
    this.role = '';
    localStorage.removeItem('role');
    this.userId = '';
    localStorage.removeItem('userId');
    this.email = '';
    localStorage.removeItem('email');
  }

}
