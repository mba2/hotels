import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input('config') config = null;

  public rawDate: Date;
  
  public day;
  public month;
  public year;
  private months_arr = ['January','February','March','Abril','May','June','July','August','September','November','December'];
  
  public inRange = false;
  public isCheckIn = false;
  public isCheckInWithRange = false;
  public isCheckOut = false;

  constructor() { }

  customToString() {
    this.rawDate = new Date(
      this.config[2],         /** year */
      (this.config[0] - 1),   /** month (array based indexed) */
      this.config[1],         /** day */
    );
    this.day = this.rawDate.getDate();
    this.month = this.months_arr[this.rawDate.getMonth()];
    this.year= this.rawDate.getFullYear();
  }

  ngOnInit() {
    this.customToString();
  }
}
