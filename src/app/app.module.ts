import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { AboutComponent } from './views/about/about.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { Co2GoalsComponent } from './views/preferences/co2-goals/co2-goals.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { VehicleIconComponent } from './components/vehicle-icon/vehicle-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchRouteComponent,
    NavBarComponent,
    PreferencesComponent,
    AboutComponent,
    ManageDataComponent,
    CustomVehiclesComponent,
    Co2GoalsComponent,
    EditVehicleComponent,
    VehicleIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
