import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import { RouteSearchResultsComponent } from './views/route-search-results/route-search-results.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'results', component: RouteSearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
