import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employe } from '../models/Employe';
import { AuthService } from '../services/auth.service';
import { Ticket } from "../models/Ticket";
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss']
})
export class EmpHomeComponent implements OnInit {

  @Input() emp$ : Observable<Employe> ;
  @Input() ticket$ : Observable<Ticket> ;

  constructor(
    private httpClient : HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    var url = "http://localhost:3000/api/v1/user/me";
    this.emp$ = this.httpClient.get<Employe>(url);
  }

  onSubmitSearch(form : NgForm){
    var url = "http://localhost:3000/api/v1/ticket/";
    this.ticket$ = this.httpClient.get<Ticket>(url+form.value.code);
  }
  onAssigne(code : string){
      var url='http://localhost:3000/api/v1/employe/ticket/';
      this.httpClient
      .get(url+code)
      .toPromise()
      .then(
        (res : any) => {
          var content = "Gain a bien été récupéré";
          var link = 'emp_home';
          this.openDialog("Message de confirmation", content, link);
        },
        (error) => {
          var content = error.error.error;
          var link = 'emp_home';
          this.openDialog("Error", content, link);
        }
      )
  }
  openDialog(title : String, content : String, link : String) {
    this.dialog.open(PopUpComponent, {
      width: '50%',
      data: {
        title: title,
        content: content,
        link : link
      }
    });
  }
}
