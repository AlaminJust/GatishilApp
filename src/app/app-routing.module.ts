import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DescriptionComponent } from './description/description.component';
import { AndroidPrivacyPolicyComponent } from './android-privacy-policy/android-privacy-policy.component';
import { AccountDeleteComponent } from './component/account-delete/account-delete.component';
import { RouteMapComponent } from './pages/organizations/route-map/route-map.component';
import { AddRouteMapComponent } from './pages/organizations/add-route-map/add-route-map.component';

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
