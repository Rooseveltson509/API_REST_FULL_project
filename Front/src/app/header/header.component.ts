import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn : boolean ;
  user : boolean;
  constructor(
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.getLoggedInStatus();
    if (this.authService.getRole() == 'user')
      this.user = true;
    else 
      this.user = false;

  }

}
