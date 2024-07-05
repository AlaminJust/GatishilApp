import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, switchMap, takeWhile } from 'rxjs';
import { VehicleResponse } from 'src/app/shared/api-models';
import { VehiclePaginationRequest } from 'src/app/shared/api-models/request/organization.request';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {
  totalRecords: number = 0;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'id', 'organizationId', 'photo', 'address', 'code', 'isFavourite', 'addedBy', 'schedule', 'route', 'totalMember', 'isPublic', 'vehicleType', 'actions'];
  vehicles: VehicleResponse[] = [];
  organizationId!: number;
  load$: Subject<boolean> = new Subject<boolean>();
  isActive: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.organizationId = this.route.snapshot.params['organizationId'];
  }

  ngOnInit(): void {
    this.load$.pipe(takeWhile(() => this.isActive),
        switchMap(() => this.vehicleService.getVehicleByOrganizationId(this.organizationId, new VehiclePaginationRequest({
          pageNumber: this.paginator?.pageIndex ?? 0,
          pageSize: this.paginator?.pageSize ?? 10
        }))))
        .subscribe(x => {
          this.vehicles = x.items;
          this.dataSource = new MatTableDataSource(x.items);
          this.totalRecords = x.totalRecords;
        });

    this.load$.next(true);
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

  updateVehicle(vehicle: VehicleResponse): void {
    this.vehicleService.selectedVehicle$.next(vehicle);
    this.router.navigate(['organization/update-vehicle', this.organizationId]);
  }

  onPaginateChange($event: PageEvent) {
    console.log("Hello", $event);
    this.load$.next(true);
  }
}
