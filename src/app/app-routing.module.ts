import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './views/about/about.component';
import { Co2GoalsComponent } from './views/preferences/co2-goals/co2-goals.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { InitialSetupInfoComponent } from './views/initial-setup/initial-setup-info/initial-setup-info.component';
import { InitialSetupNameComponent } from './views/initial-setup/initial-setup-name/initial-setup-name.component';
import { InitialSetupTipsComponent } from './views/initial-setup/initial-setup-tips/initial-setup-tips.component';
import { InitialSetupVehicleComponent } from './views/initial-setup/initial-setup-vehicle/initial-setup-vehicle.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { SearchRouteComponent } from './views/search-route/search-route.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'about', component: AboutComponent },
  { path: 'initial-setup-info', component: InitialSetupInfoComponent },
  { path: 'initial-setup-name', component: InitialSetupNameComponent },
  { path: 'initial-setup-vehicle', component: InitialSetupVehicleComponent },
  { path: 'initial-setup-tips', component: InitialSetupTipsComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'preferences/manage-data', component: ManageDataComponent },
  { path: 'preferences/co2-goals', component: Co2GoalsComponent },
  { path: 'preferences/vehicles', component: CustomVehiclesComponent },
  { path: 'preferences/vehicles/:id', component: EditVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
