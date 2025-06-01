import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'users',
        loadComponent: () =>
          import('./modules/users/users.component').then(
            (m) => m.UsersComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'attractions',
        loadComponent: () =>
          import('./modules/attractions/attractions.component').then(
            (m) => m.AttractionsComponent
          ),
      },
      {
        path: 'pet-sales',
        loadComponent: () =>
          import('./modules/pets/pets.component').then((m) => m.PetsComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: 'login' },
];
