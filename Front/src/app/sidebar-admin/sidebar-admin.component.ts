import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

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
