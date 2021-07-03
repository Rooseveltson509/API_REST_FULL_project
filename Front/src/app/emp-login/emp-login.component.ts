import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.scss']
})
export class EmpLoginComponent implements OnInit {
  incorrect = false;

  constructor(
    private httpClient : HttpClient,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit (form : NgForm){
    const url = 'http://localhost:3000/api/v1/employe/login/';
    var send =true;

    if (send==true){
      const body  = {
          email: form.value.email,
          password: form.value.password,
      }
      this.httpClient
      .post(url, body )
      .toPromise()
      .then(
        (res : any) => {
            this.authService.setLoggedInStatus(true);
            this.authService.setUserId(res.userId);
            this.authService.setEmail(res.email);
            this.authService.setToken(res.token);
            this.authService.setRole('employe');
            this.router.navigate(['emp_home']);
        },
        (error) => {
          alert(error.error.error);
        }
      )
    }
  }

}
