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
import { HttpClientModule } from '@angular/common/http';
import { RouteMapComponent } from './pages/organizations/route-map/route-map.component';
import { DropdownComponent } from './shared/components/inputs/dropdown/dropdown.component';
import { AddRouteMapComponent } from './pages/organizations/add-route-map/add-route-map.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
