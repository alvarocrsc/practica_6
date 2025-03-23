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
  currentPage: number = 1;
  totalPages: number = 2;

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.arrUsers = await this.usersService.getAll(this.currentPage);
    } catch (error) {
      console.error(error);
    }
  }

  gotoPrev() {
    this.currentPage = this.currentPage === 1 ? this.totalPages : this.currentPage - 1;
    this.loadUsers();
  }

  gotoNext() {
    this.currentPage = this.currentPage === this.totalPages ? 1 : this.currentPage + 1;
    this.loadUsers();
  }
}
