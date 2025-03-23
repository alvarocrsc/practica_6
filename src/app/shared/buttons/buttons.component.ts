import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() myUser!: IUser;
  @Input() return: Boolean = false;
  usersService = inject(UsersService);
  router = inject(Router);

  deleteUser(id: string) {
    toast(`Do you want to delete the user ${this.myUser.first_name} ${this.myUser.last_name}?`, {
      action: {
        label: 'Yes',
        onClick: async () => {
          let response = await this.usersService.delete(id);
          if (response.error) {
            toast.error(response.error);
          }
          toast.success(`User @${this.myUser.username} deleted successfully`);
          this.router.navigate(['/home']);
        }
      }
    })
  }
}
