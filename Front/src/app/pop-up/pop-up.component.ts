import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router";

export interface DialogData {
  title: string;
  content: string;
  link: string;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router : Router
  ) {}

  ngOnInit(): void {
  }

  onClick() {
    this.dialogRef.close();
    this.router.navigate([this.data.link]);

  }

}
