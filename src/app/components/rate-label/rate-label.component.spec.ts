import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateLabelComponent } from './rate-label.component';

describe('RateLabelComponent', () => {
  let component: RateLabelComponent;
  let fixture: ComponentFixture<RateLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
