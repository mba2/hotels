import { HotelService } from './services/hotel.service';

/** MODULES */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';
import { NouisliderModule } from 'ng2-nouislider';



/** COMPONENTS */
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { RateLabelComponent } from './components/rate-label/rate-label.component';
import { DayComponent } from './components/day/day.component';

/** PIPE */
import { ToArrayPipe } from './custom-pipes/toArray.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    CalendarComponent,
    SearchComponent,
    CardComponent,
    ToArrayPipe,
    RateLabelComponent,
    DayComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    NouisliderModule,
    RouterModule.forRoot([
      { path: 'search', component: SearchComponent}
    ])
  ],
  providers: [ 
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(ngRedux: NgRedux<IAppState>){
  //   ngRedux.configureStore(rootReducer, INITIAL_STATE);
  // }
}
