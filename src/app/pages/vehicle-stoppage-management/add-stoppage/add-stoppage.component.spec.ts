import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoppageComponent } from './add-stoppage.component';

describe('AddStoppageComponent', () => {
  let component: AddStoppageComponent;
  let fixture: ComponentFixture<AddStoppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStoppageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
