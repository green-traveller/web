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
import { InitialSetupInfoComponent } from './views/initial-setup/initial-setup-info/initial-setup-info.component';
import { InitialSetupNameComponent } from './views/initial-setup/initial-setup-name/initial-setup-name.component';
import { InitialSetupVehicleComponent } from './views/initial-setup/initial-setup-vehicle/initial-setup-vehicle.component';
import { InitialSetupTipsComponent } from './views/initial-setup/initial-setup-tips/initial-setup-tips.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchRouteComponent,
    NavBarComponent,
    InitialSetupInfoComponent,
    InitialSetupNameComponent,
    InitialSetupVehicleComponent,
    InitialSetupTipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
