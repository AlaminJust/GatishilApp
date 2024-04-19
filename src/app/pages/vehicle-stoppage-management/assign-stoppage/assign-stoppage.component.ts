import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { IDropdown } from 'src/app/shared/models';
import { VehicleRouteService } from 'src/app/shared/services/vehicle-route.service';
import { VehicleStoppageService } from 'src/app/shared/services/vehicle-stoppage.service';

@Component({
  selector: 'app-assign-stoppage',
  templateUrl: './assign-stoppage.component.html',
  styleUrls: ['./assign-stoppage.component.css']
})
export class AssignStoppageComponent {
  addOrUpdate!: FormGroup;
  vehicleId!: number;
  dropdownItems!: IDropdown[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private vehicleStoppageService: VehicleStoppageService,
    private vehicleRouteService: VehicleRouteService
  ){
    this.vehicleId = this.route.snapshot.params['vehicleId'];
    this.createForm();
  }

  ngOnInit(): void {
    this.vehicleStoppageService.getAllStoppages()
        .subscribe((x => {
          this.dropdownItems = x;
        }));
  }

  createForm(): void {
    this.addOrUpdate = this.fb.group({
      order: [0, Validators.required],
      vehicleStoppageId: [0, Validators.required],
      vehicleId: [this.vehicleId, Validators.required]
    });
  }

  get f(): any{
    return this.addOrUpdate;
  }

  get vehicleStoppageControl(): FormControl{
    return this.f.get('vehicleStoppageId');
  }

  onSubmit(): void {
    if(this.addOrUpdate.valid){
      this.vehicleRouteService.assignStoppage(this.addOrUpdate.value)
          .pipe(tap(x => {
            console.log('Assigned stoppage', x);
          })).subscribe();
    }
  }
}
