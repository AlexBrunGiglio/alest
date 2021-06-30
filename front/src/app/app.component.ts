import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from '../services/auth-data.service';
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
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    super();
    if (isPlatformBrowser(this.platformId)) {
      this.initForBrowser();
    }
  }


  private initForBrowser() {
    const sub = AuthDataService.currentUserChanged.subscribe(() => {
      if (!AuthDataService.currentUser) {
        this.router.navigate(['/login']);
      }
    });
  }
}
