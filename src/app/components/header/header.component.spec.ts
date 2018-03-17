import { CalendarComponent } from './../calendar/calendar.component';
import { MenuComponent } from './../menu/menu.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MenuComponent,
        CalendarComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        MyDateRangePickerModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has a menu component', () => {
    expect(fixture.debugElement.nativeElement.querySelector('app-menu')).toBeTruthy();
  });
});
