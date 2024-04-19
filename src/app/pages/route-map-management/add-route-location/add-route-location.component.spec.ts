import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteLocationComponent } from './add-route-location.component';

describe('AddRouteLocationComponent', () => {
  let component: AddRouteLocationComponent;
  let fixture: ComponentFixture<AddRouteLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRouteLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRouteLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
