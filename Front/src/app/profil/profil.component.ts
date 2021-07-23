import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  @Input() user$ : Observable<User> ;
  passwordIncorrect = false;
  passwordNotIdenticals =false;

  constructor(
    private httpClient : HttpClient,
    private authService : AuthService,
    private router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    var url = environment.apiUrl+"/user/me";
    this.user$ = this.httpClient.get<User>(url);
  }

  passwordRegex = /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
  phoneRegex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

  formInfos = new FormGroup({
    firstName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50) ]),
    lastName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.pattern(this.phoneRegex)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    zip: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  formPassword = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern(this.passwordRegex)]),
    confPassword: new FormControl('', [Validators.required]),
  },{
    validators : this.mustMatch('password' ,'confPassword')
  });

  get fInfos(){
    return this.formInfos.controls;
  }

  get fPassword(){
    return this.formPassword.controls;
  }

  mustMatch(controlName : string, matchingControlName : string) : ValidatorFn{
      return (formGroup : FormGroup) : ValidationErrors=>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch){
          return
        }
        if(control.value !== matchingControl.value){
          matchingControl.setErrors({mustMatch:true});
        }
        else{
          matchingControl.setErrors(null)
        }
      }
  }


  onSubmitInfos(form : NgForm){
    const url = 'api/user/me';
    var send =true;

    if (send==true){
      const body  = {
          nom: form.value.lastName,
          prenom: form.value.firstName,
//          phone: form.value.phone,
          address: form.value.address,
          city: form.value.city,
          zipCode: form.value.zip,
      }
      this.httpClient
      .put(url, body )
      .toPromise()
      .then(
        (res : any) => {
            alert(res.msg);
        },
        (error) => {
          alert(error.error.error);
        }
      )
    }
  }

  onSubmitEmail(form : NgForm){
    const url = 'api/user/email';
    var send =true;

    if (send==true){
      const body  = {
          email: form.value.email,
          password: form.value.password,
      }
      this.httpClient
      .put(url, body )
      .toPromise()
      .then(
        (res : any) => {
            alert(res.msg);
        },
        (error) => {
          alert(error.error.error);
        }
      )
    }
  }

  onSubmitPassword(form : NgForm){
    const url = 'api/user/me';
    var send =true;

    if (send==true){
      const body  = {
        oldPassword: form.value.oldPassword,
        newPassword: form.value.newPassword,
        confNewPassword: form.value.confNewPassword,
      }
      this.httpClient
      .put(url, body )
      .toPromise()
      .then(
        (res : any) => {
            alert(res.msg);
        },
        (error) => {
          alert(error.error.error);
        }
      )
    }
  }

  submitInfos(){
    const url = 'api/user/me';

      const body  = {
          nom: this.formInfos.value.lastName,
          prenom: this.formInfos.value.firstName,
          phoneNumber: this.formInfos.value.phone,
          address: this.formInfos.value.address,
          city: this.formInfos.value.city,
          zipCode: this.formInfos.value.zip,
      }
      this.httpClient
      .put(url, body )
      .toPromise()
      .then(
        (res : any) => {
          var title : "Message de confirmation";
          var content = "Vos informations ont bien été mises à jour";
          var link = '/client_home';
          this.openDialog("Message de confirmation", content, link);
        },
        (error) => {
          var title = 'Erreur'
          var content = error.error.error;
          var link = '/client_infos_profil';
          this.openDialog('Erreur', content, link);
        }
      )

  }

  submitPassword(){
    const url = 'api/user/pwd/me';
    var send =true;

    if (send==true){
      const body  = {
        // oldPassword: form.value.oldPassword,
        password: this.formPassword.value.password,
        password_confirm: this.formPassword.value.confPassword,
      }
      this.httpClient
      .put(url, body )
      .toPromise()
      .then(
        (res : any) => {
          var title : 'Message de confirmation';
          var content = "Le mot de passe a bien été mis à jour";
          var link = '/client_home';
          this.openDialog('Message de confirmation', content, link);
        },
        (error) => {
          var title = 'Erreur'
          var content = error.error.error;
          var link = '/client_infos_profil';
          this.openDialog('Erreur', content, link);
        }
      )
    }
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
