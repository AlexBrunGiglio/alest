import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginViewModel, UsersService } from '../../../../providers/api-client.generated';
import { AuthDataService } from '../../../../services/auth-data.service';
import { BaseComponent } from '../../../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../base/base-auth.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class LoginComponent extends BaseComponent {
  hide = true;
  loginViewModel: LoginViewModel;
  errorMsg: string;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    super();
    this.init()
  }

  async init() {
    this.loginViewModel = {} as any;
  }

  async login() {
    if (!this.loginViewModel.username || !this.loginViewModel.password)
      return;
    this.loading = true;
    const loginResponse = await this.authService.login(this.loginViewModel).toPromise();
    if (!loginResponse.success) {
      this.errorMsg = loginResponse.message;
      console.log("🚀 ~ LoginComponent ~ login ~ loginResponse.messag", loginResponse.message);
    } else {
      localStorage.setItem('token', loginResponse.token);
      const test = AuthDataService.currentAuthToken;
      console.log("🚀 ~ LoginComponent ~ login ~ test", test);
      this.router.navigateByUrl('/' + this.RoutesList.AdminHome);
    }
    this.loading = false;
  }
}
