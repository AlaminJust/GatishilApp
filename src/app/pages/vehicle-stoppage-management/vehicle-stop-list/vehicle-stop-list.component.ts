import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleStoppageResponse } from 'src/app/shared/api-models';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-stop-list',
  templateUrl: './vehicle-stop-list.component.html',
  styleUrls: ['./vehicle-stop-list.component.css']
})
export class VehicleStopListComponent {
  displayedColumns: string[] = ['id', 'stoppageDistanceFromDhaka', 'name', 'address', 'latitude', 'longitude', 'applitude', 'photo', 'order'];
  dataSource!: VehicleStoppageResponse[];
  vehicleId!: number;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private router: Router
  ){
    this.vehicleId = this.route.snapshot.params['vehicleId'];
    this.dataSource = this.vehicleService.getStoppageByVehicleId(this.vehicleId);
  }

  gotoAssignStoppage(): void {
    this.router.navigate(['organization/assign-stoppage', this.vehicleId]);
  }
}
