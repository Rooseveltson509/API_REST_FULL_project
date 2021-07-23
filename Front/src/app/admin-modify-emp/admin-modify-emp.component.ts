import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../models/Employe';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-admin-modify-emp',
  templateUrl: './admin-modify-emp.component.html',
  styleUrls: ['./admin-modify-emp.component.scss']
})
export class AdminModifyEmpComponent implements OnInit {
  @Input() employe$ : Observable<Employe> ;
  employe : Employe;
  passwordIncorrect = false;
  passwordNotIdenticals =false;
  constructor(
    private httpClient : HttpClient,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {

    // var url = "api/user/me";
    // this.user$ = this.httpClient.get<User>(url);
    // this.httpClient
    // .get<User>(url)
    // .toPromise()
    // .then(
    //   (res : User) => {
    //       this.user$ = res;
    //   },
    //   (error) => {
    //     alert(error.error.error);
    //   }
    // )
  }

  onSubmitInfos(form : NgForm){
    const url = environment.apiUrl+'/user/admin/employe/';
    const id = this.route.snapshot.paramMap.get('id_emp') ;
    var send =true;

    if (send==true){
      const body  = {
          nom: form.value.lastName,
          prenom: form.value.firstName,
          email: form.value.email
          //magasin: form.value.store,
      }
      this.httpClient
      .put(url+id, body )
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
    const url = environment.apiUrl+'/user/admin/employe/';
    const id = this.route.snapshot.paramMap.get('id_emp') ;
    var send =true;

    if (send==true){
      const body  = {
        oldPassword: form.value.oldPassword,
        newPassword: form.value.newPassword,
        confNewPassword: form.value.confNewPassword,
      }
      this.httpClient
      .put(url+id, body )
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

}
