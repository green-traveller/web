import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AboutComponent } from './views/about/about.component';
import { AppComponent } from './app.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { Co2BarChartComponent } from './components/co2-bar-chart/co2-bar-chart.component';
import { Co2GoalsComponent } from './views/preferences/co2-goals/co2-goals.component';
import { Co2PieChartComponent } from './components/co2-pie-chart/co2-pie-chart.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { KmPieChartComponent } from './components/km-pie-chart/km-pie-chart.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PersonalBalanceComponent } from './views/personal-balance/personal-balance.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { VehicleIconComponent } from './components/vehicle-icon/vehicle-icon.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    BarChartComponent,
    Co2BarChartComponent,
    Co2GoalsComponent,
    Co2PieChartComponent,
    CustomVehiclesComponent,
    EditVehicleComponent,
    KmPieChartComponent,
    ManageDataComponent,
    NavBarComponent,
    PersonalBalanceComponent,
    PieChartComponent,
    PreferencesComponent,
    SearchRouteComponent,
    VehicleIconComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
