import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {

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
