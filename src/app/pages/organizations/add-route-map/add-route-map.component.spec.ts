import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteMapComponent } from './add-route-map.component';

describe('AddRouteMapComponent', () => {
  let component: AddRouteMapComponent;
  let fixture: ComponentFixture<AddRouteMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRouteMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
