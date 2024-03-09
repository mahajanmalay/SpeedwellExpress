import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { EstimationComponent } from './components/estimation/estimation.component';
import { ServicesDetailsComponent } from './components/services-details/services-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'estimation', component: EstimationComponent },
  { path: 'services', component: ServicesDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
