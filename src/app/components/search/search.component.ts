import { HotelService } from './../../services/hotel.service';
import { Component, OnInit, QueryList, ContentChildren, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CardComponent } from '../card/card.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  private checkInDate: string;
  private checkOutDate: string;
  private numberOfNights: string;

  private intialHotelsList = [];
  private hotelsList = [];


  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private service: HotelService
  ) {
    this.checkInDate = this.routeInfo.snapshot.queryParamMap.get('checkin');
    this.checkOutDate = this.routeInfo.snapshot.queryParamMap.get('checkout');
    this.numberOfNights = this.routeInfo.snapshot.queryParamMap.get('nights');
  }

  /**
   * @description This method will subscribe to the Action on Calendar Component. When the 
   * search button (inside the Calendar Component) is clicked... The Search Component will get
   * notified... will receive the checkin and checkout info and update its view!!
   */
  onSearchMade() {
    this.service
      .onSearchMade$
      .subscribe( payload => {
        console.log(payload);
        this.checkInDate = payload.checkInDate;
        this.checkOutDate = payload.checkOutDate;
        this.numberOfNights = payload.numberOfNights;
      });
  }

  /**
   * @description This method will receive an object as argument(payload).
   * Each property of this object is a rate. If a rate was selected by the user 
   * it's gonna have 'true' as its value. Otherwise it's gonna have 'false'.
   * The iteration over this object will append only the rates with 'true' as 
   * a value into an array called 'desiredRates'!!
   * Then the hotel list is filter...and it's gonna content only hotels with 
   * the selected rates
   * @param payload 
   */
  filter(payload) {
    const desiredRates = [];

    for (const rate in payload.value) {
      if (payload.value.hasOwnProperty(rate)) {
        if (payload.value[rate]) { desiredRates.push(+rate);}
      }
    }

    /** If no label was selected, just show the origin list returned via ajax and terminate the function */
    if(!desiredRates.length) {
      this.hotelsList = this.intialHotelsList;
      return;
    }

    this.hotelsList = this.intialHotelsList.filter((hotel) => {
      return desiredRates.includes(hotel.rate);
    });
  }


  ngOnInit() {
    this.onSearchMade();
    /**
     * @description As soon as this component initialize, a list of hotels is 
     * requested from a server. If there's a propery named 'hotels' on the JSON...
     * this method will hold the list!
    */
    this.service.getAll()
      .subscribe(response => {
        const hotels = response.json().hotels;

        if(hotels) { 
          this.hotelsList = this.intialHotelsList = hotels;
        }
      });
  
  }

}
