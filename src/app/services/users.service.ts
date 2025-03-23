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

  async getAll(page: number = 1): Promise<IUser[]> {
    const res = await lastValueFrom(this.httpClient.get<IResponse>(`${this.endpoint}?page=${page}`));
    return res.results;
  }

  async getById(id: string): Promise<IUser> {
    const res = await lastValueFrom(this.httpClient.get<IUser>(`${this.endpoint}/${id}`));
    return res;
  }

  async delete(id: string): Promise<IUser | any> {
    const res = await lastValueFrom(this.httpClient.delete<IUser>(`${this.endpoint}/${id}`));
    return res;
  }

  async update(user: IUser): Promise<IUser> {
    let { _id, ...body } = user;
    return lastValueFrom(this.httpClient.put<IUser>(`${this.endpoint}/${_id}`, body));
  }

  async insert(user: IUser): Promise<IUser> {
    let { _id, ...body } = user;
    return lastValueFrom(this.httpClient.post<IUser>(this.endpoint, body));
  }
}
