import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { VehicleTypes } from 'src/app/shared/enums';
import { VehicleService } from 'src/app/shared/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {
  addOrUpdate!: FormGroup;
  organizationId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ){
    this.organizationId = this.route.snapshot.params['organizationId'];

    this.createForm();
  }

  get VehicleTypes(): any {
    return VehicleTypes;
  }

  createForm(): void {
    this.addOrUpdate = this.fb.group({
      name: ['', Validators.required],
      aliceName: [''],
      photo: [''],
      address: [''],
      code: [''],
      isPublic: [true],
      schedule: [''],
      route: [''],
      vehicleType: [VehicleTypes.Train]
    });
  }

  onSubmit() {
    if (this.addOrUpdate.valid) {
      this.vehicleService.addVehicle(this.organizationId, this.addOrUpdate.value)
          .pipe(tap(x => {
            console.log("Added data", x);
            return x;
          })).subscribe();
    }
  }
}
