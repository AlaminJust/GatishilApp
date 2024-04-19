import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStoppageComponent } from './assign-stoppage.component';

describe('AssignStoppageComponent', () => {
  let component: AssignStoppageComponent;
  let fixture: ComponentFixture<AssignStoppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignStoppageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignStoppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
