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
  private checkInDate: any;
  private checkOutDate: any;

  private hotelsList = [];

  // /**
  //  * @description A list containing all Card Components inside this Search Component
  //  */
  // @ContentChildren(CardComponent) cardsList: QueryList<CardComponent>;
  

  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private service: HotelService
  ) {
    this.checkInDate = this.routeInfo.snapshot.queryParamMap.get('checkin');
    this.checkOutDate = this.routeInfo.snapshot.queryParamMap.get('checkout');
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
        this.checkInDate = payload.checkInDate;
        this.checkOutDate = payload.checkOutDate;
      });
  }

  /**
   * @description As soon as this component initialize, a list of hotels is 
   * requested from a server. If there's a propery named 'hotels' on the JSON...
   * this method will hold the list! 
   */
  ngOnInit() {
    this.onSearchMade();
    this.service.getAll()
      .subscribe(response => {
        const hotels = response.json().hotels;

        if(hotels) { 
          this.hotelsList = hotels;
        }
      });
  
  }

}
