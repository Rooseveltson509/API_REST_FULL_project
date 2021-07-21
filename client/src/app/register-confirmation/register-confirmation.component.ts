import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class RegisterConfirmationComponent implements OnInit {
  @Input() email = this.route.snapshot.paramMap.get('email') ;

  constructor(
    private route : ActivatedRoute

  ) { }

  ngOnInit(): void {
  }

}
