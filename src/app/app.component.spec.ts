import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { TestBed, async } from '@angular/core/testing';

import { MenuComponent } from './components/menu/menu.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        CalendarComponent,
        SearchComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        MyDateRangePickerModule,
        // RouterModule
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Charlotte - The Queen City'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Charlotte - The Queen City');
  }));
});
