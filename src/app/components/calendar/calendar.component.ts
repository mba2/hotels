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
  public currentYear = 2017;
  public currentMonth = 'August';
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

  setCheckIn() {
    this.currentDay.isCheckIn = true;
    this.checkInDate = this.currentDay;
  }

  updateCheckIn() {
    // Resets the current Checkin Date
    this.checkInDate.isCheckIn = false;
    // The clicked day becames the new Checkin Date
    this.currentDay.isCheckIn = true;
    this.checkInDate = this.currentDay;
  }

  setCheckOut() {
    this.checkInDate.isCheckInWithRange = true; // set a flag to indicate the 
    this.currentDay.isCheckOut = true;
    this.checkOutDate = this.currentDay; // toggle the day
    this.setRange();         // set all range
    this.searchIsAllowed =  true;
    this.numberOfNights = this.getNumberOfNights();
  }

  resetCalendar() {
    //Reset the previous choices and its attributes!!
    this.checkInDate = this.checkInDate.isCheckIn = this.checkInDate.isCheckInWithRange = null;
    this.checkOutDate = this.checkOutDate.isCheckOut = null;
    // The clicked day becomes the Check In Date!!
    this.currentDay.isCheckIn = true;
    this.checkInDate = this.currentDay;
    //disable range
    this.resetRange();
  }

  selectDay(day: DayComponent) {
    this.currentDay = day;
    /** 
     * IF THIS CONDITION IS TRUE... THEN IT`S THE USER`S FIRST CLICK ...
     * SET THE CLICKED DAY AS CHECKIN AND TERMINATE THE FUNCTION
    * */
    if ( !this.checkInDate &&
         !this.checkOutDate) {
      this.setCheckIn();
      return;
    }
    /**
     * IF two day are selected... 
    */
    if (this.checkInDate &&
        this.checkOutDate) {
        this.resetCalendar();
      return;
    }
    /**
     * If the clicked day is lower than the current Checkin Date
     */
    if (this.currentDay.rawDate.getTime() <= this.checkInDate.rawDate.getTime()) {
      this.updateCheckIn();
      return;
    }
    /**
     * If we already have a  Checkin Date and the clicked day is greater than than the Checkin Date
     * We can set the Checkout Date
    */
    if ( this.checkInDate &&
      this.currentDay !== this.checkInDate) {
      this.setCheckOut();
      return;
    }
  }

  getNumberOfNights(): number {
    const beginDate = new Date(this.checkInDate.rawDate.getTime());
    const endDate = new Date(this.checkOutDate.rawDate.getTime());

    let nights = (endDate as any) - (beginDate as any); /** Just asserting the ts lint!! */
      nights = (nights / 1000 / 60 / 60 / 24) + 1;
      return nights;
  }

  private formatDate(date: DayComponent): string {
    if (!date) { return; } /** If this string is empty...terminate the function */

    const day = date.day;
    const month = date.month;
    const year = date.year;

    return `${month} ${day},${year}`;
  }


  searchForHotels(e,payload) {
    if (!this.searchIsAllowed) { return; } /** Terminate this function if the user hasn't select the dates yet */

    this.router.navigate(
      ['/search'],
      {
        queryParams : {
          checkin: this.formatDate(this.checkInDate),
          checkout: this.formatDate(this.checkOutDate),
          nights: this.numberOfNights
        }
      }
    );
    this.service.search({
      checkInDate : this.formatDate(this.checkInDate),
      checkOutDate : this.formatDate(this.checkOutDate),
      numberOfNights : this.numberOfNights
    });
  }
}
