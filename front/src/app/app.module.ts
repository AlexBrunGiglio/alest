import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/admin/home/home.component';
import { UsersListComponent } from './pages/admin/users-list/users-list.component';
import { EditUsersComponent } from './pages/admin/edit-users/edit-users.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDrawerModule } from './components/admin-drawer/admin-drawer.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersListComponent,
    EditUsersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminDrawerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
