import { Component, OnInit } from '@angular/core';

/**  MODULES */
import { Router } from '@angular/router';

/**  CALENDAR PLUGIN */
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

/**  SERVICE */
import { HotelService } from './../../services/hotel.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private checkInDate: string;
  private checkOutDate: string;
  private numberOfNights: number;

  private searchIsAllowed = false;

  /** PLUGIN CONFIGURATION */
  myDateRangePickerOptions: IMyDrpOptions = {
    monthLabels : {
      1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'August', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    },
    dateFormat: 'dd.mmm.yyyy',
    inline: true
  };

  constructor(private router: Router, private service: HotelService) { }

  ngOnInit() {
  }

  getNumberOfNights(event: IMyDateRangeModel): number {
    const beginDate = new Date(event.beginJsDate);
    const endDate = new Date(event.endJsDate);

    let nights = (endDate as any) - (beginDate as any); /** Just asserting the ts lint!! */
      nights = (nights / 1000 / 60 / 60 / 24) + 1;
      return nights;
  }

  private formatDate(rawDate: any): string {
    if (!rawDate) { return; } /** If this string is empty...terminate the function */

    const date = rawDate.split('.'); /** SEPARATE DAY, MONTH AND YEAR */

    const day = date[0];
    const month = date[1];
    const year = date[2];

    return `${month} ${day},${year}`;
  }

  onDateRangeChanged(event: IMyDateRangeModel): void {
    if (!event.formatted) { return; } /** If this string is empty...terminate the function */

    const dates = event.formatted.split('-'); /** SEPARATE CHECKIN AND CHECKOUT DATES AND STORE THEM*/
    const rawCheckInDate = dates[0];
    const rawCheckOutDate = dates[1];

    this.checkInDate = this.formatDate(rawCheckInDate);
    this.checkOutDate = this.formatDate(rawCheckOutDate);
    this.numberOfNights = this.getNumberOfNights(event);

    this.searchIsAllowed =  true;
  }

  searchForHotels(e,payload) {
    if (!this.searchIsAllowed) { return; } /** Terminate this function if the user hasn't select the dates yet */

    this.router.navigate(
      ['/search'],
      {
        queryParams : {
          checkin: this.checkInDate,
          checkout: this.checkOutDate,
          nights: this.numberOfNights 
        }
      }
    );
    this.service.search(payload);
  }
}
