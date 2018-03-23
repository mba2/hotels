import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

/**  MODULES */
import { Router } from '@angular/router';

/**  CALENDAR PLUGIN */
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';

/**  SERVICE */
import { HotelService } from './../../services/hotel.service';

/**  COMPONENTS */
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  @ViewChildren(DayComponent) days: QueryList<DayComponent>;
  
  private currentDay: DayComponent;
  public checkInDate: DayComponent;
  public checkOutDate: DayComponent;
  private numberOfNights: number;
  private currentYear = 2017;
  private currentMonth = 'August';
  private searchIsAllowed = false;

  constructor(private router: Router, private service: HotelService) { }

  ngOnInit() {
  }

  resetRange(): void {
    this.days.forEach(day => day.inRange = false);
  }

  setRange(): void {
    this.days.forEach(day => {
      if (day.rawDate > this.checkInDate.rawDate &&
        day.rawDate < this.checkOutDate.rawDate) {
          day.inRange = true;
        }
    });
  }

  test(day: DayComponent) {
    this.currentDay = day;

    /** 
     * IF THIS CONDITION IS TRUE... THEN IT`S THE USER`S FIRST CLICK ...
     * SET THE CLICKED DAY AS CHECKIN AND TERMINATE THE FUNCTION
    * */
    if ( !this.checkInDate
        && !this.checkOutDate) {
        this.currentDay.isCheckIn = true;
        this.checkInDate = this.currentDay;
        console.log(this.currentDay);
      return;
    }

    /**
     * IF two day are selected... 
    */
    if (this.checkInDate &&
      this.checkOutDate) {
      //Reset the previous choices and its attributes!!
      this.checkInDate = this.checkInDate.isCheckIn = this.checkInDate.isCheckInWithRange = null;
      this.checkOutDate = this.checkOutDate.isCheckOut = null;
      // The clicked day becomes the Check In Date!!
      day.isCheckIn = true;
      this.checkInDate = day;
      //disable range
      this.resetRange();
      return;
    }

    /**
     * If the clicked day is lower than the current Checkin Date
     */
    if (day.rawDate.getTime() <= this.checkInDate.rawDate.getTime()) {
      // Resets the current Checkin Date
      this.checkInDate.isCheckIn = false;
      // The clicked day becames the new Checkin Date
      day.isCheckIn = true;
      this.checkInDate = day;
      return;
    }

    /**
     * If we already have a  Checkin Date and the clicked day is greater than than the Checkin Date
     * We can set the Checkout Date
    */
    if ( this.checkInDate &&
      day !== this.checkInDate) {
      this.checkInDate.isCheckInWithRange = true; // set a flag to indicate the 
      day.isCheckOut = true;
      this.checkOutDate = day; // toggle the day
      this.setRange();         // set all range
      return;
    }

  }

  // getNumberOfNights(event: IMyDateRangeModel): number {
  //   const beginDate = new Date(event.beginJsDate);
  //   const endDate = new Date(event.endJsDate);

  //   let nights = (endDate as any) - (beginDate as any); /** Just asserting the ts lint!! */
  //     nights = (nights / 1000 / 60 / 60 / 24) + 1;
  //     return nights;
  // }

  // private formatDate(rawDate: any): string {
  //   if (!rawDate) { return; } /** If this string is empty...terminate the function */

  //   const date = rawDate.split('.'); /** SEPARATE DAY, MONTH AND YEAR */

  //   const day = date[0];
  //   const month = date[1];
  //   const year = date[2];

  //   return `${month} ${day},${year}`;
  // }

  // onDateRangeChanged(event: IMyDateRangeModel): void {
  //   if (!event.formatted) { return; } /** If this string is empty...terminate the function */

  //   const dates = event.formatted.split('-'); /** SEPARATE CHECKIN AND CHECKOUT DATES AND STORE THEM*/
  //   const rawCheckInDate = dates[0];
  //   const rawCheckOutDate = dates[1];

  //   this.checkInDate = this.formatDate(rawCheckInDate);
  //   this.checkOutDate = this.formatDate(rawCheckOutDate);
  //   this.numberOfNights = this.getNumberOfNights(event);

  //   this.searchIsAllowed =  true;
  // }

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
