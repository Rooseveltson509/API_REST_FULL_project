import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employe } from '../models/Employe';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.scss']
})
export class ListEmpComponent implements OnInit {
  @Input() employes$ : Observable<Employe>;
  filter : string;
  employe : Employe;
  passwordIncorrect =false;
  passwordNotIdenticals : false;

  listEmployes = true;
  // confirmationDeleteForm = false;
  // confirmationDeleteMsg = false;
  updateEmployeForm = false;
  // confirmationUpdateEmployeMsg = false;
  email = ''
  constructor(
    private httpClient : HttpClient,
    private router : Router,
    public dialog: MatDialog
  ) {};


    ngOnInit(): void {
    var url = "http://localhost:3000/api/v1/admin/employees";
    this.employes$ = this.httpClient.get<Employe>(url);
  }

  hiddenAll (){
    this.listEmployes = false;
    // this.confirmationDeleteForm = false;
    // this.confirmationDeleteMsg = false;
    this.updateEmployeForm = false;
    // this.confirmationUpdateEmployeMsg = false;
  }

  gererEmploye(employe : Employe){
    this.employe = employe;
    this.hiddenAll();
    this.updateEmployeForm=true;
  }

  backToListEmployes(){
    this.employe = null;
    this.hiddenAll();
    this.listEmployes=true;
  }

  deleteEmploye(email : string){
    this.openDialogDelete();

    this.hiddenAll();
    this.email = email;
    // this.confirmationDeleteForm =true;
  }

  confirmDeleteEmploye(){
    var url = 'http://localhost:3000/api/v1/employe/admin/';
    this.httpClient
    .delete(url+this.email )
    .toPromise()
    .then(
      (res : any) => {
        var title ='Confirmation';
        var content = "Le compte a bien été supprimé";
        var link ='/admin_list_emp';
        this.openDialog(title, content, link);
        this.email = '';
        this.hiddenAll();
        this.listEmployes=true;
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
    // this.listEmployes = true;
  }

  onSubmitPassword(form : NgForm){
    // var title ='Confirmation';
    // var content = "Le mot de passe a bien été mis à jour";
    // var link ='/admin_list_emp';
    // this.openDialog(title, content, link);
    // this.hiddenAll();
    // this.listEmployes =true;
  }
  onSubmitEmail(form : NgForm){
    var url = 'http://localhost:3000/api/v1/user/admin/employe/';
    const body  = {
      nom: this.employe.nom,
      prenom: this.employe.prenom,
      email : form.value.email,
      magasin: this.employe.magasin
    }
    console.log(body);

    this.httpClient
    .put(url+this.employe.email, body )
    .toPromise()
    .then(
      (res : any) => {
        var title ='Confirmation';
        var content = "L'email a bien été mis à jour";
        var link ='/admin_list_emp';
        this.openDialog(title, content, link);
        this.hiddenAll();
        // this.updateEmployeForm = false;
        this.listEmployes =true;
      },
      (error) => {
        alert(error.error.error);
        console.log(error);
      }
    )

    }


  onSubmitInfos(form : NgForm) {
    var url = 'http://localhost:3000/api/v1/user/admin/employe/';
    const body  = {
        nom: form.value.nom,
        prenom: form.value.prenom,
        email : this.employe.email,
        magasin: form.value.magasin
    }
    console.log(body);
    this.httpClient
    .put(url+this.employe.email, body )
    .toPromise()
    .then(
      (res : any) => {
        var title ='Confirmation';
        var content = "Le compte employé a bien été mis à jour";
        var link ='/admin_list_emp';
        this.openDialog(title, content, link);
        this.hiddenAll();
        // this.updateEmployeForm = false;
        this.listEmployes =true;
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

  // openDialogDelete() {
  //   const dialogRef = this.dialog.open(PopUpDeleteComponent, {
  //     width: '50%',
  //     data: {
  //       title: "Supprimer",
  //       content: "voulez vraiment supprimer cet utilisateur",
  //       link : '/admin_list_emp'
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result){
  //       console.log(result);
  //
  //       // this.confirmDeleteEmploye();
  //     }else{
  //       console.log(result);
  //
  //       this.cancel();
  //       this.hiddenAll();
  //       this.listEmployes =true;
  //     }
  //   });
  //
  // }

  openDialogDelete() {
      const dialogRef = this.dialog.open(PopUpDeleteComponent, {
        width: '50%',
        height: '200px',
        data: {
          title: "Supprimer",
          content: "voulez vraiment supprimer cet utilisateur",
          link : '/admin_list_emp'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if ( result ){
              this.confirmDeleteEmploye();
            }else{
              console.log( result );

              this.cancel();
              this.hiddenAll();
              this.listEmployes =true;
            }
        // console.log(`Dialog result: ${result}`);
      });
    }
}
