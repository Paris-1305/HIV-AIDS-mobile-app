import { Routes } from '@angular/router';
import { PreventionPage } from './pages/prevention/prevention.page';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'loader',
    loadComponent: () => import('./pages/loader/loader.page').then(m => m.LoaderPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'prevention',
    loadComponent: () => import('./pages/prevention/prevention.page').then(m => m.PreventionPage)
  },

  {
    path: 'treatment',
    loadComponent: () => import('./pages/treatment/treatment.page').then(m => m.TreatmentPage)
  },
  {
    path: 'hiv_basics',
    loadComponent: () => import('./pages/hivbasics/hivbasics.page').then(m => m.HIVBasicsPage)
  },
  {
    path: 'testing',
    loadComponent: () => import('./pages/testing/testing.page').then(m => m.TestingPage)
  },
  {
    path: 'living_with_hiv',
    loadComponent: () => import('./pages/living-with-hiv/living-with-hiv.page').then(m => m.LivingWithHIVPage)
  },
  {
    path: 'faqsection',
    loadComponent: () => import('./pages/faqsection/faqsection.page').then(m => m.FAQSectionPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'hiv_stigma',
    loadComponent: () => import('./pages/hivstigma/hivstigma.page').then(m => m.HIVStigmaPage)
  },
  {
    path: 'hiv',
    loadComponent: () => import('./pages/hiv/hiv.page').then(m => m.HIVPage)
  },
  {
    path: 'map-page',
    loadComponent: () => import('./pages/location-page/location-page.page').then( m => m.LocationPagePage)
  },
    {
    path: 'hiv-women-health',
    loadComponent: () => import('./pages/hiv-women-health/hiv-women-health.page').then( m => m.HivWomenHealthPage)
  },
  {
    path: 'support-people-hiv',
    loadComponent: () => import('./pages/support-people-hiv/support-people-hiv.page').then( m => m.SupportPeopleHivPage)
  },
  {
    path: 'ending-hiv-stigma',
    loadComponent: () => import('./pages/ending-hiv-stigma/ending-hiv-stigma.page').then( m => m.EndingHivStigmaPage)
  }
 // wildcard route to handle unknown paths
];
