import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleStoppageResponse } from 'src/app/shared/api-models';
import { UpdateVehicleRouteComponent, VehicleUpdateRequest } from 'src/app/shared/components/update-vehicle-route/update-vehicle-route.component';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-stop-list',
  templateUrl: './vehicle-stop-list.component.html',
  styleUrls: ['./vehicle-stop-list.component.css']
})
export class VehicleStopListComponent {
  displayedColumns: string[] = ['id', 'stoppageDistanceFromDhaka', 'name', 'address', 'latitude', 'longitude', 'applitude', 'photo', 'departure', 'order', 'actions'];
  dataSource!: VehicleStoppageResponse[];
  vehicleId!: number;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router,
    private dialog: MatDialog
  ){
    this.vehicleId = this.route.snapshot.params['vehicleId'];
    this.dataSource = this.vehicleService.getStoppageByVehicleId(this.vehicleId);
  }

  openUpdateVehicleRoute(vehicleStoppage: VehicleStoppageResponse) {
    let request: VehicleUpdateRequest = {
      vehicleId: this.vehicleId,
      vehicleStoppageId: vehicleStoppage.vehicleStoppageId,
      order: vehicleStoppage.order,
      departure: vehicleStoppage.departure,
      vehicleRouteId: vehicleStoppage.vechileRouteId
    };

    const dialogRef = this.dialog.open(UpdateVehicleRouteComponent, {
      width: '400px',
      data: request,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated vehicle data:', result);
      }
    });
  }

  gotoAssignStoppage(): void {
    this.router.navigate(['organization/assign-stoppage', this.vehicleId]);
  }
}
