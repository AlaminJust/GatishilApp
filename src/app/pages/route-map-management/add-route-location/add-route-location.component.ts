import { RouteLocationRequest } from '../../../shared/api-models/request/organizations.request';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, forkJoin, switchMap, takeWhile, tap } from 'rxjs';
import { RouteLocationResponse, VehicleRouteResponse, VehicleStoppageResponse } from 'src/app/shared/api-models';
import { RouteMapService } from 'src/app/shared/services/route-map.service';
import { VehicleStoppageService } from 'src/app/shared/services/vehicle-stoppage.service';

@Component({
  selector: 'app-add-route-location',
  templateUrl: './add-route-location.component.html',
  styleUrls: ['./add-route-location.component.css']
})
export class AddRouteLocationComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  routeLocations: RouteLocationResponse[] = [];
  map!: google.maps.Map;
  selectedLatLng!: google.maps.LatLng;
  markers: google.maps.Marker[] = [];
  routeId!: number;
  load$: Observable<boolean> = new BehaviorSubject<boolean>(true);
  isAlive: boolean = true;
  getLocations$!: Observable<RouteLocationResponse[]>;
  origin!: VehicleStoppageResponse;
  destination!: VehicleStoppageResponse;
  selectedVehicleRouteMap!: VehicleRouteResponse;
  previousLatLng!: google.maps.LatLng;
  isProcessing: boolean = false;

  constructor(  
    private routeMapService: RouteMapService,
    private route: ActivatedRoute,
    private stoppageService: VehicleStoppageService
  ) {
    this.selectedVehicleRouteMap = this.routeMapService.selectedVehicleRouteMap;
   }

  ngOnInit() {
    this.routeId = Number(this.route.snapshot.paramMap.get('id'));
    this.getLocations$ = this.routeMapService.getRouteLocations(this.routeId);

    this.load$.pipe(takeWhile(() => this.isAlive),
      switchMap(() => this.getLocations$)
    ).subscribe((x:RouteLocationResponse[]) => {
      console.log('Route locations', this.routeId, x);
      this.routeLocations = x;
    });

    forkJoin([
      this.stoppageService.getById(this.selectedVehicleRouteMap.originId),
      this.stoppageService.getById(this.selectedVehicleRouteMap.destinationId),
      this.getLocations$
    ]).pipe(
      tap(([origin, destination,routeLocation]) => {
        this.origin = origin;
        this.routeLocations = routeLocation;
        this.destination = destination;
        this.loadMap(this.origin);
        this.addMarkers();
        this.addMarkerOfStation(this.origin.latitude, this.origin.longitude);
        this.addMarkerOfStation(this.destination.latitude, this.destination.longitude);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  ngAfterViewInit(): void {
    //this.loadMap();
  }

  loadMap(vehicleStoppage: VehicleStoppageResponse) {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: vehicleStoppage.latitude ?? 23.733289614143892, lng: vehicleStoppage.longitude ?? 90.42658088305527 }, 
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Add click event listener to the map
    google.maps.event.addListener(this.map, 'click', (event) => {
      console.log("Event data", event, event.latLng.lat(), event.latLng.lng());
      this.handleMapClick(event.latLng);
    });
  }

  addMarkerOfStation(lat: number,lon: number): void {
     // Check if map is initialized
     if (!this.map) {
      console.error("Map is not initialized.");
      return;
    }
    const latLng = new google.maps.LatLng(lat, lon);
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

  }

  addMarkers() {
    // Check if map is initialized
    if (!this.map) {
      console.error("Map is not initialized.");
      return;
    }
  
    // Check if routeLocations array is empty
    if (this.routeLocations.length === 0) {
      console.error("Route locations array is empty.");
      return;
    }
  
    for (const location of this.routeLocations) {
      const latLng = new google.maps.LatLng(location.latitude, location.longitude);
      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });

      // Add event listener for double click on marker
      marker.addListener('dblclick', () => {
        this.removeLocation(marker);
      });

      this.markers.push(marker); // Store marker in array
    }
  }

  removeMarker(marker: google.maps.Marker) {
    console.log('Remove marker', marker);
    // Remove marker from the map
    marker.setMap(null);
  
    // Find index of marker in markers array
    const index = this.markers.indexOf(marker);
    if (index !== -1) {
      // Remove marker from markers array
      this.markers.splice(index, 1);
    }
  }

  addMarker(latLng: google.maps.LatLng) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    
    marker.addListener('dblclick', () => {
      this.removeLocation(marker);
    });

    this.markers.push(marker); // Store marker in array
  }

  removeLocation(marker: google.maps.Marker){
    // Find the corresponding RouteLocationResponse object
    const location = this.routeLocations.find(loc => 
      loc.latitude === marker.getPosition()?.lat() && 
      loc.longitude === marker.getPosition()?.lng()
    );

    if (location) {
      // Call the API to remove the location
      this.routeMapService.removeLocation(location.id).subscribe(response => {
        // Handle the response if needed
        console.log(`Location with ID ${location.id} removed successfully.`);
        this.removeMarker(marker);
      }, error => {
        // Handle error if API call fails
        console.error('Error removing location:', error);
      });
    } else {
      console.warn('No matching location found for the marker.');
    }
  }

  caculateDistance(one: google.maps.LatLng, two: google.maps.LatLng): number {
    if(!one || !two){
      return 0;
    }

    return google.maps.geometry.spherical.computeDistanceBetween(one, two);
  }

  handleMapClick(latLng: google.maps.LatLng) {
    if(this.isProcessing){
      console.log("Request already processing");
      return;
    }    
    
    const distance = this.caculateDistance(this.previousLatLng, latLng);
    if(!confirm(`Distance is ${distance} m from previous`)){
      return;
    }

    this.isProcessing = true;

    let request: RouteLocationRequest = {
      latitude: latLng.lat(),
      longitude: latLng.lng(),
      city: null,
    }

    this.routeMapService.addLocation(this.routeId, request)
        .subscribe(x => {
          this.addMarker(latLng);
          this.isProcessing = false;
          this.previousLatLng = latLng;
          console.log("Added lat long!", x);
        });

    // You can use this.selectedLatLng.latitude() and this.selectedLatLng.longitude() to get the latitude and longitude
    console.log('Selected coordinates:', this.selectedLatLng.lat(), this.selectedLatLng.lng());
  }

  clearMarkers() {
    for (const marker of this.markers) {
      marker.setMap(null); // Remove marker from map
    }
    this.markers = []; // Clear markers array
  }
}
