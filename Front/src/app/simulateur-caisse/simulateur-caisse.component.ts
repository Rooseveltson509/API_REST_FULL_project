import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TicketCode } from '../models/TicketCode';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-simulateur-caisse',
  templateUrl: './simulateur-caisse.component.html',
  styleUrls: ['./simulateur-caisse.component.scss']
})
export class SimulateurCaisseComponent implements OnInit {
  // interface Result {
  //   ticketCode : string
  // };

  ticketCode;
  constructor(
    private httpClient : HttpClient
  ) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    var url = environment.apiUrl+"/ticket/create/";
    var body = {
      buyer : form.value.buyer
    }
    // this.res$ = this.httpClient.post<>(url, body);

    this.httpClient
    .post(url, body)
    .toPromise()
    .then(
      (res : any) => {
          console.log(res.ticketCode);
          this.ticketCode = res.ticketCode;
      },
      (error) => {
        alert(error.error.error);
      }
    )

  }

}
