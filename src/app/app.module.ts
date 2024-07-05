import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DescriptionComponent } from './description/description.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { AndroidPrivacyPolicyComponent } from './android-privacy-policy/android-privacy-policy.component';
import { AccountDeleteComponent } from './component/account-delete/account-delete.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteMapComponent } from './pages/route-map-management/route-map/route-map.component';
import { DropdownComponent } from './shared/components/inputs/dropdown/dropdown.component';
import { AddRouteMapComponent } from './pages/route-map-management/add-route-map/add-route-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRouteLocationComponent } from './pages/route-map-management/add-route-location/add-route-location.component';
import { OrganizationListComponent } from './pages/organization-management/organization-list/organization-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { VehicleListComponent } from './pages/vehicle-management/vehicle-list/vehicle-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { VehicleStopListComponent } from './pages/vehicle-stoppage-management/vehicle-stop-list/vehicle-stop-list.component';
import { AssignStoppageComponent } from './pages/vehicle-stoppage-management/assign-stoppage/assign-stoppage.component';
import { AddVehicleRouteMapComponent } from './pages/route-map-management/add-vehicle-route-map/add-vehicle-route-map.component';
import { StoppageListComponent } from './pages/vehicle-stoppage-management/stoppage-list/stoppage-list.component';
import { AddStoppageComponent } from './pages/vehicle-stoppage-management/add-stoppage/add-stoppage.component';
import { AddVehicleComponent } from './pages/vehicle-management/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './pages/vehicle-management/update-vehicle/update-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DescriptionComponent,
    PrivacyPolicyComponent,
    HomeLayoutComponent,
    AndroidPrivacyPolicyComponent,
    AccountDeleteComponent,
    RouteMapComponent,
    DropdownComponent,
    AddRouteMapComponent,
    AddRouteLocationComponent,
    OrganizationListComponent,
    VehicleListComponent,
    LoginComponent,
    VehicleStopListComponent,
    AssignStoppageComponent,
    AddVehicleRouteMapComponent,
    StoppageListComponent,
    AddStoppageComponent,
    AddVehicleComponent,
    UpdateVehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
