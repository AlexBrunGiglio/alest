import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
import { LoginComponent } from './pages/login/login.component';
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
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
