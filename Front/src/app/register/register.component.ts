import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error = false;
  errorBody='';

  constructor(
    private httpClient: HttpClient,
    private router : Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }
  passwordRegex = /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
  phoneRegex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
  form = new FormGroup({
    gender : new FormControl('', [Validators.required]),
    firstName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50) ]),
    lastName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(this.phoneRegex)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern(this.passwordRegex)]),
    confPassword: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    zip: new FormControl('', [Validators.required, Validators.minLength(2)]),
    optin: new FormControl(''),
    major: new FormControl('', [Validators.requiredTrue])
  }
  ,{
    validators : this.mustMatch('password' ,'confPassword')
  }
);

  get f(){
    return this.form.controls;
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

  submit(){
    const url = environment.apiUrl+'/user/register/';
    var optin ='';
    if (this.form.value.optin) {
      optin='yes';
    }else {
      optin='no';
    }
    const body  = {
        gender : this.form.value.gender,
        nom: this.form.value.lastName,
        prenom: this.form.value.firstName,
        email: this.form.value.email,
        phoneNumber: this.form.value.phone,
        password: this.form.value.password,
        password_confirm: this.form.value.confPassword,
        address: this.form.value.address,
        zipCode: this.form.value.zip,
        city: this.form.value.city,
        optin: optin
    }

    this.httpClient
    .post(url, body )
    .toPromise()
    .then(
      (res : any) => {
          this.router.navigate(['confirmation_register/'+this.form.value.email]);
      },
      (error) => {
        this.error =true;
        if (error.error.error == 'user already exist'){
          this.errorBody = "L'utilisateur existe déjà";
          var content = "L'utilisateur existe déjà";
          var link = '/register';
          this.openDialog(content, link);
        }else {
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
