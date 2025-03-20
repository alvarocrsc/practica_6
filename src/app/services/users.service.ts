import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = 'https://peticiones.online/api/users';
  private httpClient = inject(HttpClient);

  async getAll(): Promise<IUser[]> {
    const res = await lastValueFrom(this.httpClient.get<IResponse>(this.endpoint));
    return res.results;
  }
}
