import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import {AboutComponent} from './views/about/about.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'nav', component: NavBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
