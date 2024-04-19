import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationPaginationRequest, OrganizationResponse } from 'src/app/shared/api-models';
import { OrganizationTypes, mapOrganizationTypeToString } from 'src/app/shared/enums';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent {
  organizations: OrganizationResponse[] = [];
  displayedColumns: string[] = ['id', 'name', 'photo', 'address', 'organizationType', 'isAllowedPublicToAddVehicle', 'actions'];

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ){
    this.organizationService.getOrganizations(new OrganizationPaginationRequest())
        .subscribe(x => {
          this.organizations = x.items;
        });
  }

  getOrganizationTypeName(type: OrganizationTypes): string {
    return mapOrganizationTypeToString(type);
  }

  performAction(organization: OrganizationResponse): void {
    this.router.navigate(['organization/vehicle-list', organization.id]);
  }
}
