import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-reinit-password',
  templateUrl: './reinit-password.component.html',
  styleUrls: ['./reinit-password.component.scss']
})
export class ReinitPasswordComponent implements OnInit {

  passwordRegex = /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
  constructor(
    private httpClient : HttpClient,
    private route : ActivatedRoute,
    private router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  form = new FormGroup({
    password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern(this.passwordRegex)]),
    confPassword: new FormControl('', [Validators.required]),
  },{
    validators : this.mustMatch('password' ,'confPassword'),
  });

  get f(){
    return this.form.controls;
  }

  mustMatch(controlName : string, matchingControlName : string): ValidatorFn{
      return (formGroup : FormGroup): ValidationErrors=>{
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

  submit (){
    const url = environment.apiUrl+'/user/restpwd/';
    const id = this.route.snapshot.paramMap.get('id') ;
    const token = this.route.snapshot.paramMap.get('token') ;
    const body  = {
      password: this.form.value.password,
      password_confirm: this.form.value.confPassword,
    }
    console.log(url+id+'/'+token);

    this.httpClient
    .post(url+id+'/'+token, body )
    .toPromise()
    .then(
      (res : any) => {
        var content = "Votre mot de passe a bien été modifié veuillez vous connecter";
        var link = 'register';
        this.openDialog(content, link, 'Message de confirmation');
      },
      (error) => {
        alert(error.error.error)
        if (error.error.error=="ce lien n'est plus valide...." ||
            error.error.error=="cannot found user" ||
            error.error.error=="Your token is not valid." ) {
          var content = "Ce lien n'est pas valide, veuillez de nouveau saisir votre adresse email.";
          var link = 'password_forgotten';
          this.openDialog(content, link, 'Erreur');
        }else{
          var content = "Une erreur est servenue, veuillez ressayer plus tard !";
          var link = '';
          this.openDialog(content, link, 'Erreur');
        }
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
