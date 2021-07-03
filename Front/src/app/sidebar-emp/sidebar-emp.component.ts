import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-emp',
  templateUrl: './sidebar-emp.component.html',
  styleUrls: ['./sidebar-emp.component.scss']
})
export class SidebarEmpComponent implements OnInit {

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
