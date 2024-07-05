import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeWhile, tap } from 'rxjs';
import { VehicleResponse } from 'src/app/shared/api-models';
import { VehicleTypes } from 'src/app/shared/enums';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent {
  addOrUpdate!: FormGroup;
  organizationId!: number;
  isAlive: boolean = true;
  vehicleId!: number;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {
    this.organizationId = this.route.snapshot.params['organizationId'];

    this.vehicleService.selectedVehicle$
        .pipe(takeWhile(() => this.isAlive), tap((x: VehicleResponse|null) => {
          if(x){
            this.vehicleId = x.id;
            this.createForm(x);
          }
        })).subscribe();
  }

  createForm(x: VehicleResponse): void {
    this.addOrUpdate = this.fb.group({
      name: [x.name, Validators.required],
      aliceName: [x.aliceName],
      photo: [x.photo],
      address: [x.address],
      code: [x.code],
      isPublic: [x.isPublic],
      schedule: [x.schedule],
      route: [x.route],
      vehicleType: [x.vehicleType]
    });
  }

  onUpdate(): void {
    if(this.addOrUpdate.valid){
      this.vehicleService.updateVehicle(this.organizationId, this.vehicleId, this.addOrUpdate.value)
          .pipe(tap(x => {
            console.log("Update data", x);
            return x;
          })).subscribe();
    }
  }

  get VehicleTypes(): any {
    return VehicleTypes;
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
