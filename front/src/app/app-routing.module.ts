import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/admin/home/home.component';
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
