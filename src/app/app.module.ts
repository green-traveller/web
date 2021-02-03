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
import { CloseIconComponent } from './components/close-icon/close-icon.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { Co2BarChartComponent } from './components/co2-bar-chart/co2-bar-chart.component';
import { CustomisationComponent } from './views/preferences/customisation/customisation.component';
import { Co2PieChartComponent } from './components/co2-pie-chart/co2-pie-chart.component';
import { CustomVehiclesComponent } from './views/preferences/custom-vehicles/custom-vehicles.component';
import { EditVehicleComponent } from './views/preferences/custom-vehicles/edit-vehicle/edit-vehicle.component';
import { InitialSetupNameComponent } from './views/initial-setup/initial-setup-name/initial-setup-name.component';
import { InitialSetupNavComponent } from './components/initial-setup-nav/initial-setup-nav.component';
import { InitialSetupVehicleComponent } from './views/initial-setup/initial-setup-vehicle/initial-setup-vehicle.component';
import { InitialSetupTipsComponent } from './views/initial-setup/initial-setup-tips/initial-setup-tips.component';
import { InstallationInstructionsComponent } from './components/installation-instructions/installation-instructions.component';
import { InstallTipsComponent } from './views/preferences/install-tips/install-tips.component';
import { EmptyResultsComponent } from './components/empty-results/empty-results.component';
import { KmPieChartComponent } from './components/km-pie-chart/km-pie-chart.component';
import { ManageDataComponent } from './views/preferences/manage-data/manage-data.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PersonalBalanceComponent } from './views/personal-balance/personal-balance.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PreferencesComponent } from './views/preferences/preferences.component';
import { PreviousRoutesComponent } from './views/previous-routes/previous-routes.component';
import { RouteSearchResultsComponent } from './views/route-search-results/route-search-results.component';
import { SaveAnimationComponent } from './components/save-animation/save-animation.component';
import { SearchRouteComponent } from './views/search-route/search-route.component';
import { VehicleIconComponent } from './components/vehicle-icon/vehicle-icon.component';


@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    BarChartComponent,
    CloseIconComponent,
    Co2BarChartComponent,
    CustomisationComponent,
    Co2PieChartComponent,
    CustomVehiclesComponent,
    EditVehicleComponent,
    InitialSetupNameComponent,
    InitialSetupNavComponent,
    InitialSetupVehicleComponent,
    InitialSetupTipsComponent,
    InstallTipsComponent,
    EmptyResultsComponent,
    KmPieChartComponent,
    ManageDataComponent,
    NavBarComponent,
    PersonalBalanceComponent,
    PieChartComponent,
    PreferencesComponent,
    PreviousRoutesComponent,
    RouteSearchResultsComponent,
    SaveAnimationComponent,
    SearchRouteComponent,
    VehicleIconComponent,
    InstallationInstructionsComponent

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
