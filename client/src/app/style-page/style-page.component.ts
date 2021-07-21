import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDeleteComponent } from '../pop-up-delete/pop-up-delete.component';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({

  selector: 'app-style-page',
  templateUrl: './style-page.component.html',
  styleUrls: ['./style-page.component.scss']
})

export class StylePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialogDelete() {
    this.dialog.open(PopUpDeleteComponent, {
      width: '50%',
      data: {
        title: 'titre',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        link : 'register'
      }
    });
  }

  openDialog() {
    this.dialog.open(PopUpComponent, {
      width: '50%',
      data: {
        title: 'titre',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        link : 'register'
      }
    });
  }

}
