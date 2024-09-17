import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SolutionComponent } from './solution/solution.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component'; 
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default to home
  { path: '**', redirectTo: 'home' } // Wildcard route for invalid URLs
];
