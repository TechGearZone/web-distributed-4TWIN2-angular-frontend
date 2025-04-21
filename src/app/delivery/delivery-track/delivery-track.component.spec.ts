import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryTrackComponent } from './delivery-track.component';

describe('DeliveryTrackComponent', () => {
  let component: DeliveryTrackComponent;
  let fixture: ComponentFixture<DeliveryTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryTrackComponent]
    });
    fixture = TestBed.createComponent(DeliveryTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
