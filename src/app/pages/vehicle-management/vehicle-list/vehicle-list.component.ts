import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, takeWhile } from 'rxjs';
import { VehicleResponse } from 'src/app/shared/api-models';
import { VehiclePaginationRequest } from 'src/app/shared/api-models/request/organization.request';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  displayedColumns: string[] = ['name', 'id', 'organizationId', 'photo', 'address', 'code', 'isFavourite', 'addedBy', 'schedule', 'route', 'totalMember', 'isPublic', 'vehicleType', 'actions'];
  vehicles: VehicleResponse[] = [];
  organizationId!: number;
  load$: Observable<boolean> = new BehaviorSubject<boolean>(true);
  isActive: boolean = true;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.organizationId = this.route.snapshot.params['organizationId'];


    console.log("OrganizationId", this.organizationId);
  }

  ngOnInit(): void {
    this.load$.pipe(takeWhile(() => this.isActive),
        switchMap(() => this.vehicleService.getVehicleByOrganizationId(this.organizationId, new VehiclePaginationRequest())))
        .subscribe(x => {
          this.vehicles = x.items;
        });
  }

  addVehicleRouteMap(vehicle: VehicleResponse): void {
    this.router.navigate(['organization/vehicle-route-map', vehicle.id]);
  }

  performAction(vehicle: VehicleResponse){
    this.router.navigate(['organization/stoppage-list', vehicle.id]);
  }

  addVehicle(){
    this.router.navigate(['organization/add-vehicle', this.organizationId]);
  }
}
