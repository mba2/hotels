import { Component, OnInit } from '@angular/core';

/**  CALENDAR PLUGIN */
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private checkInDate;
  private checkOutDate;

  myDateRangePickerOptions: IMyDrpOptions = {
    monthLabels : { 
      1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'August', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'
    },
    dateFormat: 'dd.mmm.yyyy',
    // inline: true
  };
;

  constructor() { }

  ngOnInit() {
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
  }
}
