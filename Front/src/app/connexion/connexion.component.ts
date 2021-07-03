import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  error = false;
  errorBody ='';
  constructor(
    private httpClient : HttpClient,
    private router : Router,
    private authService : AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  form = new FormGroup({
    cEmail: new FormControl('', [Validators.required, Validators.email]),
    cPassword: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    const url = 'http://localhost:3000/api/v1/user/login/';
    const body  = {
      email: this.form.value.cEmail,
      password: this.form.value.cPassword,
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
          this.authService.setRole('user');
          this.router.navigate(['client_home']);
        },
        (error) => {
          this.error =true;
          if (error.error.error == 'Utilisateur introuvable.'){
            this.errorBody = "Cet utilisateur n'existe pas !";
          }else if (error.error.error == 'Email ou mot de passe INVALIDE.'){
            this.errorBody = "Email ou mot de passe incorrect";
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
