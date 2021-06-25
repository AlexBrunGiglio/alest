import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService, LoginViewModel, UsersService } from '../../../../providers/api-client.generated';
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
    private userService: UsersService,
  ) {
    super();
    this.init()
  }

  async init() {
    this.loginViewModel = {} as any;
    const userResponse = await this.userService.getAllUsers().toPromise();
    console.log("🚀 ~ LoginComponent ~ init ~ userResponse", userResponse);
  }

  async login() {
    if (!this.loginViewModel.username || !this.loginViewModel.password)
      return;
    // this.loading = true;
    const loginResponse = await this.authService.login(this.loginViewModel).toPromise();
    if (!loginResponse.success) {
      this.errorMsg = loginResponse.message;
      console.log("🚀 ~ LoginComponent ~ login ~ loginResponse.messag", loginResponse.message);
    } else
      console.log("connexion réussi");
    // this.loading = false;
  }
}
