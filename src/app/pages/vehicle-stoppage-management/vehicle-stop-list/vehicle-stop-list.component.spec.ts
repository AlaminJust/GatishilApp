import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStopListComponent } from './vehicle-stop-list.component';

describe('VehicleStopListComponent', () => {
  let component: VehicleStopListComponent;
  let fixture: ComponentFixture<VehicleStopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleStopListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleStopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
