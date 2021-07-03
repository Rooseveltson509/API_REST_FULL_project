import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

export interface DialogData {
  response: boolean;
  title : string;
  content: string;
  link: string;
}

@Component({
  selector: 'app-pop-up-delete',
  templateUrl: './pop-up-delete.component.html',
  styleUrls: ['./pop-up-delete.component.scss']
})
export class PopUpDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopUpDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router : Router
  ) {}

  ngOnInit(): void {
  }

}
