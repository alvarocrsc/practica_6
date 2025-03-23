import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-view',
  imports: [ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  user: IUser | any = {
    _id: '',
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    password: ''
  };

  usersService = inject(UsersService);
  route = inject(ActivatedRoute);

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idUser = params.get('idUser'); 
      if (idUser) {
        try {
          this.user = await this.usersService.getById(idUser);
          if (this.user.error) {
            toast.error(this.user.error);
          }
        } catch (error) {
          console.error("Error al obtener usuario: ", error);
        }
      }
    });
  }
}
