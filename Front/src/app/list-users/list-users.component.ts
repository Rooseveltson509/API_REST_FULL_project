import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/User';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @Input() users$ : Observable<User>;
  filter : string;
  user : User;
  passwordIncorrect =false;
  passwordNotIdenticals : false;

  listUsers = true;
  // confirmationDeleteForm = false;
  // confirmationDeleteMsg = false;
  updateUserForm = false;
  // confirmationUpdateUserMsg = false;
  email = ''
  constructor(
    private httpClient : HttpClient,
    private router : Router,
    public dialog: MatDialog

  ) {};


    ngOnInit(): void {
    var url = "http://localhost:3000/api/v1/admin/users";
    this.users$ = this.httpClient.get<User>(url);
  }

  hiddenAll (){
    this.listUsers = false;
    // this.confirmationDeleteForm = false;
    // this.confirmationDeleteMsg = false;
    this.updateUserForm = false;
    // this.confirmationUpdateUserMsg = false;
  }

  gererUser(user : User){
    this.user = user;
    this.hiddenAll();
    this.updateUserForm=true;
  }

  backToListUsers(){
    this.user = null;
    this.hiddenAll();
    this.listUsers=true;
  }

  deleteUser(email : string){
    this.openDialogDelete();
    this.hiddenAll();
    this.email = email;
    // this.confirmationDeleteForm =true;
  }

  confirmDeleteUser(){
    var url = 'http://localhost:3000/api/v1/user/admin/';
    this.httpClient
    .delete(url+this.email )
    .toPromise()
    .then(
      (res : any) => {
        var title ='Confirmation';
        var content = "Le compte a bien été supprimé";
        var link ='/admin_list_users';
        this.openDialog(title, content, link);
        this.email = '';
        this.hiddenAll();
        this.listUsers=true;

      },
      (error) => {
        alert(error.error.error);
        console.log(error);
      }
    )
  }
  cancel(){
    this.email = '';
    // this.hiddenAll();
    // this.listUsers = true;
  }

  onSubmitPassword(form : NgForm){
    // var title ='Confirmation';
    // var content = "Le mot de passe a bien été mis à jour";
    // var link ='/admin_list_emp';
    // this.openDialog(title, content, link);
    // this.hiddenAll();
    // this.listEmployes =true;
  }

  onSubmitInfos(form : NgForm) {
    var url = 'http://localhost:3000/api/v1/user/admin/';
    const body  = {
      gender: form.value.gender,
      nom: form.value.lastName,
        prenom: form.value.firstName,
//          phone: form.value.phone,
        address: form.value.address,
        city: form.value.city,
        zipCode: form.value.zip,
    }
    this.httpClient
    .put(url+this.user.email, body )
    .toPromise()
    .then(
      (res : any) => {
        var title ='Confirmation';
        var content = "Le compte client a bien été mis à jour";
        var link ='/admin_list_users';
        this.openDialog(title, content, link);
        this.hiddenAll();
        // this.updateEmployeForm = false;
        this.listUsers =true;
      },
      (error) => {
        alert(error.error.error);
        console.log(error);
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

  openDialogDelete() {
      const dialogRef = this.dialog.open(PopUpDeleteComponent, {
        width: '50%',
        height: '200px',
        data: {
          title: "Supprimer",
          content: "voulez vraiment supprimer cet utilisateur",
          link : '/admin_list_users'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if ( result ){
              this.confirmDeleteUser();
            }else{
              console.log( result );

              this.cancel();
              this.hiddenAll();
              this.listUsers =true;
            }
        // console.log(`Dialog result: ${result}`);
      });
    }

}
