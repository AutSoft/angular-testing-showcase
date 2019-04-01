import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightStopDetailsComponent } from './flight-stop-details.component';

describe('FlightStopDetailsComponent', () => {
  let component: FlightStopDetailsComponent;
  let fixture: ComponentFixture<FlightStopDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightStopDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightStopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
