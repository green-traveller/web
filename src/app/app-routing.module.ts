import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import { PlacesSearchComponent } from './components/places-search/places-search.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 's', component: PlacesSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
