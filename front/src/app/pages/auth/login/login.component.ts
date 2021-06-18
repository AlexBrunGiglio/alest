import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../base/base-auth.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent extends BaseComponent implements OnInit {
  hide = true;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
