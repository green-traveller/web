import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './views/about/about.component';
import { CustomisationComponent } from './views/preferences/customisation/customisation.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { InitialSetupNameComponent } from './views/initial-setup/initial-setup-name/initial-setup-name.component';
import { InitialSetupTipsComponent } from './views/initial-setup/initial-setup-tips/initial-setup-tips.component';
import { InitialSetupVehicleComponent } from './views/initial-setup/initial-setup-vehicle/initial-setup-vehicle.component';
import { InstallTipsComponent } from './views/preferences/install-tips/install-tips.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PersonalBalanceComponent } from './views/personal-balance/personal-balance.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { PreviousRoutesComponent } from './views/previous-routes/previous-routes.component';
import { RouteSearchResultsComponent } from './views/route-search-results/route-search-results.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'about', component: AboutComponent },
  { path: 'balance', component: PersonalBalanceComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'preferences/manage-data', component: ManageDataComponent },
  { path: 'preferences/customisation', component: CustomisationComponent },
  { path: 'preferences/add-to-home-screen', component: InstallTipsComponent },
  { path: 'preferences/vehicles', component: CustomVehiclesComponent },
  { path: 'preferences/vehicles/:id', component: EditVehicleComponent },
  { path: 'previous-routes', component: PreviousRoutesComponent},
  { path: 'preferences/vehicles/:id', component: EditVehicleComponent },
  { path: 'results', component: RouteSearchResultsComponent },
  { path: 'setup', component: InitialSetupNameComponent },
  { path: 'setup/vehicle', component: InitialSetupVehicleComponent },
  { path: 'setup/tips', component: InitialSetupTipsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
