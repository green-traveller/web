import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AboutComponent } from './views/about/about.component';
import { AppComponent } from './app.component';
import { CloseIconComponent } from './components/close-icon/close-icon.component';
import { Co2GoalsComponent } from './views/preferences/co2-goals/co2-goals.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { InitialSetupInfoComponent } from './views/initial-setup/initial-setup-info/initial-setup-info.component';
import { InitialSetupNameComponent } from './views/initial-setup/initial-setup-name/initial-setup-name.component';
import { InitialSetupNavComponent } from './components/initial-setup-nav/initial-setup-nav.component';
import { InitialSetupVehicleComponent } from './views/initial-setup/initial-setup-vehicle/initial-setup-vehicle.component';
import { InitialSetupTipsComponent } from './views/initial-setup/initial-setup-tips/initial-setup-tips.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { VehicleIconComponent } from './components/vehicle-icon/vehicle-icon.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    CloseIconComponent,
    Co2GoalsComponent,
    CustomVehiclesComponent,
    EditVehicleComponent,
    InitialSetupInfoComponent,
    InitialSetupNameComponent,
    InitialSetupNavComponent,
    InitialSetupVehicleComponent,
    InitialSetupTipsComponent,
    ManageDataComponent,
    NavBarComponent,
    PreferencesComponent,
    SearchRouteComponent,
    NavBarComponent,
    VehicleIconComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
