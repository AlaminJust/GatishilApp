import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoppageListComponent } from './stoppage-list.component';

describe('StoppageListComponent', () => {
  let component: StoppageListComponent;
  let fixture: ComponentFixture<StoppageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoppageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoppageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
