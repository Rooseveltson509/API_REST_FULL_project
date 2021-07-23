import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-admin-new-emp',
  templateUrl: './admin-new-emp.component.html',
  styleUrls: ['./admin-new-emp.component.scss']
})
export class AdminNewEmpComponent implements OnInit {
  // confirmationCreateEmployeMsg = false;
  emailError = false;
  passwordError = false;
  confPasswordError = false;
  defaultStore = 'Paris';
  constructor(
    private httpClient : HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    const url = environment.apiUrl+'/admin/employe/new';
    var send =true;
    if(form.value.password!=form.value.confPassword){
      this.confPasswordError=true;
      send=false;
    }
    console.log("send"+send);
    if (send==true){

      const body  = {
          nom: form.value.lastName,
          prenom: form.value.firstName,
          email: form.value.email,
          password: form.value.password,
          password_confirm: form.value.confPassword,
          magasin: form.value.store
      }

      this.httpClient
      .post(url, body )
      .toPromise()
      .then(
        (res : any) => {
          var title ='Confirmation';
          var content = "Le compte employé a bien été créé";
          var link ='/admin_list_emp';
          this.openDialog(title, content, link);
        },
        (error) => {
          var title ='Error';
          var content = error.error.error;
          var link ='/admin_new_emp';
          this.openDialog(title, content, link);
          // alert(error.error.error);
        }
      )
    }
  }
  // conf(){
  //   this.confirmationCreateEmployeMsg = false;
  // }

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
