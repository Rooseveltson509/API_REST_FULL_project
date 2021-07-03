import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Ticket } from "../models/Ticket";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() tickets$ : Observable<Ticket[]>;
  imgSrcInfuseur = "../assets/img/infuseur.png";
  imgSrcThe1 = "../assets/img/the-1.png";
  imgSrcThe2 = "../assets/img/the-2.png";
  imgSrcCoffret1 = "../assets/img/coffret-1.png";
  imgSrcCoffret2 = "../assets/img/coffret-2.png";

  // tickets = [
  //   {
  //     number : 1,
  //     code :"123456789",
  //     status : "validé",
  //     gain : "coffret infuseurs",
  //     valeur : "49 EUR",
  //     date: "22/07/1992"
  //   },
  //   {
  //     number : 2,
  //     code :"123456789",
  //     status : "récupéré le 24/09/2021",
  //     gain : "coffret infuseurs",
  //     valeur : "49 EUR",
  //     date: "22/07/1992 à 16H33"
  //   },
  //   {
  //     number : 3,
  //     code :"123456789",
  //     status : "récupérer",
  //     gain : "coffret infuseurs",
  //     valeur : "49 EUR",
  //     date: "22/07/1992 à 16H33"
  //   },
  //
  // ]
  constructor(
    private httpClient : HttpClient
  ) { }

  ngOnInit(): void {
    var url = "http://localhost:3000/api/v1/user/tickets/";
    this.tickets$ = this.httpClient.get<Ticket[]>(url);
  }

  toDate (date : String) : string {
    if (!date) return "Pas encore";
    var splitted = date.split("T", 1);
    return splitted[0];
  }

}
