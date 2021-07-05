import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/admin/home/home.component';
import { UsersListComponent } from './pages/admin/users/users-list/users-list.component';
import { EditUsersComponent } from './pages/admin/users/edit-users/edit-users.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdminDrawerModule } from './components/admin-drawer/admin-drawer.module';
import { SharedModule } from './shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/errors/unauthorized/unauthorized.component';
import { InternalServerComponent } from './pages/errors/internal-server/internal-server.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ApiModule, BASE_PATH, Configuration, ConfigurationParameters } from '../providers/api-client.generated';
import { SpinnerModule } from './components/spinner/spinner.module';
import { AuthGuard } from './routes/guards/auth-guard';
import { RoleGuard } from './routes/guards/role-guard';
import { HttpInterceptor } from '../providers/http-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthProvider } from '../services/auth-provider';
import { DialogService } from '../services/dialog.service';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
    apiKeys: {},
    withCredentials: true,
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersListComponent,
    EditUsersComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    InternalServerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule.forRoot(apiConfigFactory),
    AdminDrawerModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    SpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthProvider,
    DialogService,
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
