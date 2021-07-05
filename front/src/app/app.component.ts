import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { accessToken } from '../environments/constant';
import { AuthDataService } from '../services/auth-data.service';
import { AuthProvider } from '../services/auth-provider';
import { LocalStorageService } from '../services/local-storage.service';
import { BaseComponent } from './base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'front';
  constructor(
    private router: Router,
    private authProvider: AuthProvider,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    super();
    this.initForBrowser();
  }


  private initForBrowser() {
    const accesToken = LocalStorageService.getFromLocalStorage(accessToken);
    this.authProvider.getUserFromAccessToken(accesToken, true);
    if (!AuthDataService.currentUser)
      this.router.navigate(['/login']);
  }
}
