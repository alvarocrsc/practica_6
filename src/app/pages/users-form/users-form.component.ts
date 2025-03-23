import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css'
})
export class UsersFormComponent {
  @Input() idUser: string = '';
  userForm: FormGroup = new FormGroup({
    _id: new FormControl('', []),
    first_name: new FormControl('', []),
    last_name: new FormControl('', []),
    email: new FormControl('', []),
    image: new FormControl('', []),
  }, []);
  user!: IUser;
  usersService = inject(UsersService);
  router = inject(Router);
  title: string = 'New User';

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('idUser') || '';

    if (this.idUser) {
      try {
        this.user = await this.usersService.getById(this.idUser);
        this.title = 'Edit User';
      } catch (msg: any) {
        toast.error(msg);
      }
    }
    this.userForm = new FormGroup({
      _id: new FormControl(this.idUser || null, []),
      first_name: new FormControl(this.user?.first_name || null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(this.user?.last_name || null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(this.user?.email || null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      image: new FormControl(this.user?.image || null, [
        Validators.required,
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)(\?.*)?)$|^(https?:\/\/.*\?.*=[^&]+)$/i),
      ])
    }, []);
  }

  checkControl(controlName: string, errorName: string) : boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched;
  }

  async getDataForm() {
    let response: IUser | any;
    try {
      if (this.userForm.value._id) {
        response = await this.usersService.update(this.userForm.value);
      } else {
        response = await this.usersService.insert(this.userForm.value);
      }
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('User saved successfully');
        this.router.navigate(['/home']);
      }
    } catch (msg: any) {
      console.log(msg);
    }
  }
}
