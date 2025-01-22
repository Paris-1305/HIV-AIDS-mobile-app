import { Routes } from '@angular/router';
import { PreventionPage } from './pages/prevention/prevention.page';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inbox',
    pathMatch: 'full',
  },
  {
    path: 'loader',
    loadComponent: () => import('./pages/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  { path: 'pages', component: PreventionPage },
  {
    path: 'pages',
    loadComponent: () => import('./pages/treatment/treatment.page').then( m => m.TreatmentPage)
  },
  {
    path: 'hivbasics',
    loadComponent: () => import('./pages/hivbasics/hivbasics.page').then( m => m.HIVBasicsPage)
  },
  {
    path: 'testing',
    loadComponent: () => import('./pages/testing/testing.page').then( m => m.TestingPage)
  },
];
