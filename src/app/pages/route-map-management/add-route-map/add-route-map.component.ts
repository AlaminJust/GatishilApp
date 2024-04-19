import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, switchMap, takeWhile, tap } from 'rxjs';
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
  load$: Subject<boolean> = new BehaviorSubject<boolean>(true);
  routes: AllRouteResponse[] = [];
  isAlive: boolean = true;
  isEditing: boolean = false;
  editText$: Subject<string> = new BehaviorSubject<string>("Add");
  selectedRoute?: AllRouteResponse;

  constructor(
    private fb: FormBuilder,
    private vehicleStoppageService: VehicleStoppageService,
    private routeMapService: RouteMapService,
    private router: Router
  ){
    this.createForm();
  }

  ngOnInit(): void {
    this.vehicleStoppageService.getAllStoppages()
        .subscribe((x => {
          this.dropdownItems = x;
        }));

    this.load$.pipe(takeWhile(() => this.isAlive),
        switchMap(() => this.routeMapService.allRoutes()))
        .pipe(tap(x => {
          this.routes = x;
        })).subscribe();
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
    this.addOrUpdate.patchValue(route);
    this.isEditing = true;
    this.editText$.next('Update');
    this.selectedRoute = route;
  }

  addLocation(route: AllRouteResponse): void {
    this.routeMapService.selectedVehicleRouteMap = {
      routeMapId: route.id,
      id: 0,
      order: 0,
      originId: route.originId,
      destinationId: route.destinationId,
      name: route.name
    };

    this.router.navigate(['route-map/add-route-location', route.id]);
  }

  onSubmit(): void{
    if(this.addOrUpdate.valid){
      if(this.isEditing && this.selectedRoute){
        this.routeMapService.update(this.selectedRoute?.id, this.addOrUpdate.value)
        .pipe(tap(x => {
          this.load$.next(true);
          this.isEditing = false;
          this.editText$.next('Add');
          this.selectedRoute = undefined;
        })).subscribe();
      }else{
        this.routeMapService.save(this.addOrUpdate.value)
        .subscribe(x => {
          this.routes.push(x);
          this.routes.sort((a, b) => a.name.localeCompare(b.name));
        });
      }
    }
  }
}
