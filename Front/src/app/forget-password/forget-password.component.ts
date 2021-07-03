import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private httpClient : HttpClient,
    private router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f(){
    return this.form.controls;
  }

  submit (){
    const url = 'http://localhost:3000/api/v1/user/forget';
    const body  = {
      email: this.form.value.email,
    }
    this.httpClient
    .post(url, body )
    .toPromise()
    .then(
      (res : any) => {
        console.log("on est là");

        this.router.navigate(['mail_password_sent/'+this.form.value.email]);
      },
      (error) => {
        if (error.error.error == 'user not found'){
          var content = "Cet utilisateur n'existe pas !";
          var link = 'password_forgotten';
          this.openDialog(content, link);
        }else if (error.error.error == 'email is not valid'){
          var content = "L'adresse email qie vous avez saisi n'est pas valide, veuillez saisir une adresse email valide !";
          var link = 'password_forgotten';
          this.openDialog(content, link);
        }else{
          var content = "Une erreur est servenue, veuillez ressayer plus tard !";
          var link = '';
          this.openDialog(content, link);
        }
      }
    )
  }

  openDialog(content : String, link : String) {
    this.dialog.open(PopUpComponent, {
      width: '50%',
      data: {
        title: 'Erreur',
        content: content,
        link : link
      }
    });
  }
}
