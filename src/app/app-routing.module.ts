import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InitialSetupInfoComponent } from './views/initial-setup/initial-setup-info/initial-setup-info.component';
import { InitialSetupNameComponent } from './views/initial-setup/initial-setup-name/initial-setup-name.component';
import { InitialSetupVehicleComponent } from './views/initial-setup/initial-setup-vehicle/initial-setup-vehicle.component';
import { InitialSetupTipsComponent } from './views/initial-setup/initial-setup-tips/initial-setup-tips.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'initial-setup-info', component: InitialSetupInfoComponent },
  { path: 'initial-setup-name', component: InitialSetupNameComponent },
  { path: 'initial-setup-vehicle', component: InitialSetupVehicleComponent },
  { path: 'initial-setup-tips', component: InitialSetupTipsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
