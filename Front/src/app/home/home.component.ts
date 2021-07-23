import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Ticket } from "../models/Ticket";
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() user$ : Observable<User> ;
  Ticket;

  constructor(
    private httpClient : HttpClient
  ) { }

  ngOnInit(): void {
    var url = environment.apiUrl+"/user/me";
    this.user$ = this.httpClient.get<User>(url);
  }

  onSubmit (ngForm : NgForm){

  }

}
