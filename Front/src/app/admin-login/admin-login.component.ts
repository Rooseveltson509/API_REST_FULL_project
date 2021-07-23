import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    const url = environment.apiUrl+'/user/login/';
    const body  = {
      email: this.form.value.email,
      password: this.form.value.password,
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
          this.authService.setRole('admin');
          this.router.navigate(['admin_home']);
        },
        (error) => {
          if (error.error.error == 'Utilisateur introuvable.'){
            this.error =true;
            this.errorBody = "Cet utilisateur n'existe pas !";
          }else if (error.error.error == 'Email ou mot de passe INVALIDE.'){
            this.error =true;
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




// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
//
// @Component({
//   selector: 'app-admin-login',
//   templateUrl: './admin-login.component.html',
//   styleUrls: ['./admin-login.component.scss']
// })
// export class AdminLoginComponent implements OnInit {
//   incorrect = false;
//
//   constructor(
//     private httpClient : HttpClient,
//     private authService : AuthService,
//     private router : Router
//   ) { }
//
//   ngOnInit(): void {
//   }
//
//   onSubmit (form : NgForm){
//     const url = environment.apiUrl+'/user/login/';
//     var send =true;
//
//     if (send==true){
//       const body  = {
//           email: form.value.email,
//           password: form.value.password,
//       }
//       this.httpClient
//       .post(url, body )
//       .toPromise()
//       .then(
//         (res : any) => {
//             alert(res.msg);
//             this.authService.setLoggedInStatus(true);
//             this.authService.setUserId(res.userId);
//             this.authService.setEmail(res.email);
//             this.authService.setToken(res.token);
//             this.authService.setRole('admin');
//             this.router.navigate(['admin_home']);
//         },
//         (error) => {
//           alert(error.error.error);
//         }
//       )
//     }
//   }
//
// }
//
//
