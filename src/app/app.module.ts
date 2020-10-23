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
import { Co2GoalsComponent } from './views/preferences/co2-goals/co2-goals.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { VehicleIconComponent } from './components/vehicle-icon/vehicle-icon.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    Co2GoalsComponent,
    CustomVehiclesComponent,
    EditVehicleComponent,
    ManageDataComponent,
    NavBarComponent,
    PreferencesComponent,
    SearchRouteComponent,
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
