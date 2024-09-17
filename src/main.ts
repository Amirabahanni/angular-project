import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\app.component';
import { routes } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\app.routes';
import { HomeComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\home\\home.component';
import { SolutionComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\solution\\solution.component';
import { StatisticComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\statistic\\statistic.component';
import { ContactComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\contact\\contact.component';
import { LoginComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\login\\login.component';
import { RegistrationComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\registration\\registration.component';
import { HeaderComponent } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\header\\header.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    HomeComponent,
    SolutionComponent,
    StatisticComponent,
    ContactComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent
  ]
});
