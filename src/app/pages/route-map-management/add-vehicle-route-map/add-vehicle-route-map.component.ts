import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { AllRouteResponse, VehicleRouteResponse } from 'src/app/shared/api-models';
import { IDropdown } from 'src/app/shared/models';
import { RouteMapService } from 'src/app/shared/services/route-map.service';
import { VehicleStoppageService } from 'src/app/shared/services/vehicle-stoppage.service';

@Component({
  selector: 'app-add-vehicle-route-map',
  templateUrl: './add-vehicle-route-map.component.html',
  styleUrls: ['./add-vehicle-route-map.component.css']
})
export class AddVehicleRouteMapComponent {
  addOrUpdate!: FormGroup;
  vehicleId!: number;
  routes: AllRouteResponse[] = [];
  vehicleRoutes: VehicleRouteResponse[] = [];
  dropdownItems!: IDropdown[];
  load$: Subject<boolean> = new BehaviorSubject<boolean>(true);
  isAlive: boolean = true;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private routeMapService: RouteMapService,
    private router: Router,
    private vehicleStoppageService: VehicleStoppageService
  ){
    this.vehicleId = this.route.snapshot.params['vehicleId'];
    this.createForm();

    this.vehicleStoppageService.getAllStoppages()
        .subscribe((x => {
          this.dropdownItems = x;
        }));


    this.routeMapService.allRoutes()
    .subscribe(x => {
      this.routes = x;
    });

    this.load$.pipe(takeWhile(() => this.isAlive),
        switchMap(() => this.routeMapService.routesByVehicle(this.vehicleId)))
        .subscribe(x => {
          this.vehicleRoutes = x;
        });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  delete(route: VehicleRouteResponse): void {
    if(confirm('Do you want to proceed this request?')){
      this.routeMapService.removeVehicleRoute(route.id)
      .pipe(tap(x => {
        this.load$.next(true);
      })).subscribe();
    }
  }

  get f(): any{
    return this.addOrUpdate;
  }

  get routeMapControl(): FormControl {
    return this.f.get('routeMapId');
  }

  nameOfDropdowns(id: number): string{
    return this.dropdownItems.find(x => x.id == id)?.name ?? id.toString();
  }

  addLocation(route: VehicleRouteResponse): void {
    this.routeMapService.selectedVehicleRouteMap = route;
    this.router.navigate(['route-map/add-route-location', route.routeMapId]);
  }

  createForm(): void {
    this.addOrUpdate = this.fb.group({
      order: [0, Validators.required],
      routeMapId: [0, Validators.required],
      vehicleId: [{value: this.vehicleId, disabled: true}, Validators.required]
    });
  }

  onSubmit(): void {
    if(this.addOrUpdate.valid){
      let request = this.addOrUpdate.value;
      request.vehicleId = this.vehicleId;

      this.routeMapService.addVehicleRouteMap(this.addOrUpdate.value)
          .pipe(tap(x => {
            this.load$.next(true);
          })).subscribe();
    }
  }
}
