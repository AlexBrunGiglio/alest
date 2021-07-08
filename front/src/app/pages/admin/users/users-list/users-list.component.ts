import { Component, OnInit } from '@angular/core';
import { UserDto, UsersService } from '../../../../../providers/api-client.generated';
import { BaseComponent, BaseRequest } from '../../../../base/base.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss', '../../../../base/base-list.scss']
})
export class UsersListComponent extends BaseComponent implements OnInit {
  users: UserDto[];
  constructor(
    private userService: UsersService,
  ) {
    super();
    this.init();
  }

  ngOnInit(): void {
  }

  async init() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const getUsersResponse = await this.userService.getAllUsers(null, null, null, null, this.request.search).toPromise();
    if (!getUsersResponse.success)
      return console.warn(getUsersResponse.message);
    this.users = getUsersResponse.users;
    this.loading = false;
  }
}
