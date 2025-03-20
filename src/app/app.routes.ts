import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UsersFormComponent } from './pages/users-form/users-form.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'user/:idUser', component: UserViewComponent },
    { path: 'newuser', component: UsersFormComponent },
    { path: 'updateuser/:idUser', component: UsersFormComponent }, 
    { path: '**', component: Error404Component}
];
