import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehicleRouteComponent } from './update-vehicle-route.component';

describe('UpdateVehicleRouteComponent', () => {
  let component: UpdateVehicleRouteComponent;
  let fixture: ComponentFixture<UpdateVehicleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVehicleRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVehicleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
