/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map!: google.maps.Map;
  selectedLatLng!: google.maps.LatLng;
  marker!: google.maps.Marker;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 23.733289614143892, lng: 90.42658088305527 }, 
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Add click event listener to the map
    google.maps.event.addListener(this.map, 'click', (event) => {
      console.log("Event data", event);
      this.handleMapClick(event.latLng);
    });
  }

  addMarker(latLng: google.maps.LatLng) {
    if (this.marker) {
      this.marker.setPosition(latLng);
    } else {
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
    }
  }

  handleMapClick(latLng: google.maps.LatLng) {
    this.selectedLatLng = latLng;
    this.addMarker(latLng);
    // You can use this.selectedLatLng.latitude() and this.selectedLatLng.longitude() to get the latitude and longitude
    console.log('Selected coordinates:', this.selectedLatLng.lat(), this.selectedLatLng.lng());
  }
}
