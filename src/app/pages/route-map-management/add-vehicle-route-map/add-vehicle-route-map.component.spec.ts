import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleRouteMapComponent } from './add-vehicle-route-map.component';

describe('AddVehicleRouteMapComponent', () => {
  let component: AddVehicleRouteMapComponent;
  let fixture: ComponentFixture<AddVehicleRouteMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVehicleRouteMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleRouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
