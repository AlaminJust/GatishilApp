import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DescriptionComponent } from './description/description.component';
import { AndroidPrivacyPolicyComponent } from './android-privacy-policy/android-privacy-policy.component';

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
