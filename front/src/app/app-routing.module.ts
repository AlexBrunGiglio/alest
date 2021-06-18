import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { InternalServerComponent } from './pages/errors/internal-server/internal-server.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/errors/unauthorized/unauthorized.component';
import { RoutesList } from './routes/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesList.AdminHome,
    pathMatch: 'full'
  },
  {
    path: RoutesList.AdminHome,
    component: HomeComponent,
  },
  {
    path: RoutesList.Login,
    component: LoginComponent,
  },
  {
    path: RoutesList.Register,
    component: RegisterComponent,
  },
  {
    path: RoutesList.ForgotPassword,
    component: ForgotPasswordComponent,
  },
  {
    path: RoutesList.Unauthorized,
    component: UnauthorizedComponent,
  },
  {
    path: RoutesList.InternalError,
    component: InternalServerComponent,
  },
  {
    path: RoutesList.NotFound,
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
