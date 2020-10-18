import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { AboutComponent } from './views/about/about.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { Co2GoalsComponent } from './views/preferences/co2-goals/co2-goals.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'preferences/manage-data', component: ManageDataComponent },
  { path: 'preferences/co2-goals', component: Co2GoalsComponent },
  { path: 'preferences/vehicles', component: CustomVehiclesComponent },
  { path: 'preferences/vehicles/:id', component: EditVehicleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'nav', component: NavBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
