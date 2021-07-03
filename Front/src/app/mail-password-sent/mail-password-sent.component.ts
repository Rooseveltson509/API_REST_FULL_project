import { Component, OnInit, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mail-password-sent',
  templateUrl: './mail-password-sent.component.html',
  styleUrls: ['./mail-password-sent.component.scss']
})
export class MailPasswordSentComponent implements OnInit {

  @Input() email = this.route.snapshot.paramMap.get('email') ;
  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
