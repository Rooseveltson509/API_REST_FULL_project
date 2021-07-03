import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-re-connect',
  templateUrl: './re-connect.component.html',
  styleUrls: ['./re-connect.component.scss']
})
export class ReConnectComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  seReConnecter(){
     this.authService.deconnexion();
     this.router.navigate(['register']);
  }
}
