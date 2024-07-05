import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DescriptionComponent } from './description/description.component';
import { AndroidPrivacyPolicyComponent } from './android-privacy-policy/android-privacy-policy.component';
import { AccountDeleteComponent } from './component/account-delete/account-delete.component';
import { RouteMapComponent } from './pages/route-map-management/route-map/route-map.component';
import { AddRouteMapComponent } from './pages/route-map-management/add-route-map/add-route-map.component';
import { AddRouteLocationComponent } from './pages/route-map-management/add-route-location/add-route-location.component';
import { OrganizationListComponent } from './pages/organization-management/organization-list/organization-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { VehicleListComponent } from './pages/vehicle-management/vehicle-list/vehicle-list.component';
import { VehicleStopListComponent } from './pages/vehicle-stoppage-management/vehicle-stop-list/vehicle-stop-list.component';
import { AssignStoppageComponent } from './pages/vehicle-stoppage-management/assign-stoppage/assign-stoppage.component';
import { AddVehicleRouteMapComponent } from './pages/route-map-management/add-vehicle-route-map/add-vehicle-route-map.component';
import { StoppageListComponent } from './pages/vehicle-stoppage-management/stoppage-list/stoppage-list.component';
import { AddStoppageComponent } from './pages/vehicle-stoppage-management/add-stoppage/add-stoppage.component';
import { AddVehicleComponent } from './pages/vehicle-management/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './pages/vehicle-management/update-vehicle/update-vehicle.component';

const routes: Routes = [
  {
    path: 'privacy-policy',
    component: HomeLayoutComponent,
    children: [{
      path: '',
      component: PrivacyPolicyComponent
    }]
  },
  {
    path: 'login',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'android-privacy-policy',
    component: AndroidPrivacyPolicyComponent
  },
  {
    path: 'delete-account',
    component: HomeLayoutComponent,
    children: [{
      path: '',
      component: AccountDeleteComponent
    }]
  },
  {
    path: 'route-map',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: RouteMapComponent
      },
      {
        path: 'add-update',
        component: AddRouteMapComponent
      },
      {
        path: 'add-route-location/:id',
        component: AddRouteLocationComponent
      }
    ]
  },
  {
    path: 'organization',
    component: HomeLayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrganizationListComponent
      },
      {
        path: 'vehicle-list/:organizationId',
        component: VehicleListComponent
      },
      {
        path: 'add-vehicle/:organizationId',
        component: AddVehicleComponent
      },
      {
        path: 'update-vehicle/:organizationId',
        component: UpdateVehicleComponent
      },
      {
        path: 'assign-stoppage/:vehicleId',
        component: AssignStoppageComponent
      },
      {
        path: 'stoppage-list/:vehicleId',
        component: VehicleStopListComponent
      },
      {
        path: 'vehicle-route-map/:vehicleId',
        component: AddVehicleRouteMapComponent
      }
    ]
  },
  {
    path: 'stoppages',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'list',
        component: StoppageListComponent
      },
      {
        path: 'add',
        component: AddStoppageComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{
      path: '',
      component: DescriptionComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
