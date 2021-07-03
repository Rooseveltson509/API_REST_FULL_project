import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-emp',
  templateUrl: './header-emp.component.html',
  styleUrls: ['./header-emp.component.scss']
})
export class HeaderEmpComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  seDeconnecter (){
    this.authService.deconnexion();
    this.router.navigate(['']);
  }

}
