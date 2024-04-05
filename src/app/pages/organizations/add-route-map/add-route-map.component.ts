import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AllRouteResponse } from 'src/app/shared/api-models';
import { IDropdown } from 'src/app/shared/models/dropdown.model';
import { RouteMapService } from 'src/app/shared/services/route-map.service';
import { VehicleStoppageService } from 'src/app/shared/services/vehicle-stoppage.service';

@Component({
  selector: 'app-add-route-map',
  templateUrl: './add-route-map.component.html',
  styleUrls: ['./add-route-map.component.css']
})
export class AddRouteMapComponent {
  addOrUpdate!: FormGroup;
  dropdownItems!: IDropdown[];

  routes: AllRouteResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleStoppageService: VehicleStoppageService,
    private routeMapService: RouteMapService
  ){
    this.createForm();
  }

  ngOnInit(): void {
    this.vehicleStoppageService.getAllStoppages()
        .subscribe((x => {
          this.dropdownItems = x;
        }));

    this.routeMapService.allRoutes()
        .subscribe(x => {
          this.routes = x;
        });
  }

  createForm(): void {
    this.addOrUpdate = this.fb.group({
      name: ['', Validators.required],
      originId: [0, Validators.required],
      destinationId: [0, Validators.required],
    });
  }

  get f(): any{
    return this.addOrUpdate;
  }

  get originControl(): FormControl{
    return this.f.get('originId');
  }

  get destinationControl(): FormControl{
    return this.f.get('destinationId');
  }

  nameOfDropdowns(id: number): string{
    return this.dropdownItems.find(x => x.id == id)?.name ?? id.toString();
  }

  editRoute(route: AllRouteResponse): void {

  }

  onSubmit(): void{
    if(this.addOrUpdate.valid){
      this.routeMapService.save(this.addOrUpdate.value)
          .subscribe(x => {
            this.routes.push(x);
            this.routes.sort((a, b) => a.name.localeCompare(b.name));
          });
    }
  }
}
