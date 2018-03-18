import { RateLabelComponent } from './components/rate-label/rate-label.component';
import { HotelService } from './services/hotel.service';

/** MODULES */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';



/** COMPONENTS */
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';

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
    RateLabelComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    MyDateRangePickerModule,
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
