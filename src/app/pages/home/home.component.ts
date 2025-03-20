import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { UserCardComponent } from "./user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  arrUsers: IUser[] = [];
  usersService = inject(UsersService);

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.arrUsers = await this.usersService.getAll();
      console.log(this.arrUsers);
    } catch (error) {
      console.error(error);
    }
  }

  gotoPrev() {

  }

  gotoNext() {

  }
}
