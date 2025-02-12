import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleRouteService } from '../../services/vehicle-route.service';
import { tap } from 'rxjs';

export interface VehicleUpdateRequest {
  vehicleRouteId: number;
  order?: number;
  vehicleStoppageId?: number;
  vehicleId?: number;
  departure?: string;
}

@Component({
  selector: 'app-update-vehicle-route',
  templateUrl: './update-vehicle-route.component.html',
  styleUrls: ['./update-vehicle-route.component.css']
})
export class UpdateVehicleRouteComponent {
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateVehicleRouteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleUpdateRequest,
    private vehicleRouteService: VehicleRouteService
  ) {
    this.vehicleForm = this.fb.group({
      order: [data.order, [Validators.required, Validators.min(1)]],
      vehicleStoppageId: [data.vehicleStoppageId, Validators.required],
      vehicleId: [data.vehicleId, Validators.required],
      departure: [data.departure, Validators.required]
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.vehicleRouteService.update(this.data.vehicleRouteId, this.vehicleForm.value)
          .pipe(tap(() => {
            this.dialogRef.close(this.vehicleForm.value);
          })).subscribe();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
