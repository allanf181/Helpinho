import { Routes } from '@angular/router';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HelperComponent } from './components/pages/helper/helper.component';
import { HelperListComponent } from './components/helper-list/helper-list.component';

export const routes: Routes = [
  { path: 'home', component: HelperListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'helper/:id', component: HelperComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redireciona a raiz para 'home'
  { path: '**', redirectTo: 'home' } 
];
