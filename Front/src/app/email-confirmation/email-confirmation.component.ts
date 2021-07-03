import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private route : ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  form = new FormGroup({
    token: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    const url = "http://localhost:3000/api/v1//user/mailValidation/";
    const id = this.route.snapshot.paramMap.get('id') ;
    const body  = {
      token: this.form.value.token,
    }

    this.httpClient
    .post(url+id, body )
    .toPromise()
    .then(
      (res : any) => {
        var content = "Votre compte a bien été validé, veuillez vous connecter";
        var link = 'register';
        this.openDialog(content, link, 'Message de confirmation');
      },
      (error) => {
        var content = "Le code que vous avez renseigner n'est pas valide. Veuillez ressayer";
        var link = 'validation/'+id;
        this.openDialog(content, link, 'Erreur');
      }
    )
  }

  openDialog(content : String, link : String, title : String) {
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
