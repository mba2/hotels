/** ANGULAR'S CORE */
import { Component, OnInit, QueryList, ContentChildren, AfterContentInit, AfterContentChecked } from '@angular/core';
/** SERVICES */
import { HotelService } from './../../services/hotel.service';
/** ROUTER */
import { Router, ActivatedRoute } from '@angular/router';
/** COMPONENTS */
import { CardComponent } from '../card/card.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  public checkInDate: string;
  public checkOutDate: string;
  private numberOfNights: string;

  private intialHotelsList = [];
  private hotelsList = [];
  public noFoundHotel = false;

  public priceRange = [100, 6000];


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
        this.checkInDate = payload.checkInDate;
        this.checkOutDate = payload.checkOutDate;
        this.numberOfNights = payload.numberOfNights;
      });
  }

  /**
   * @description This function gets the object binded to our form. Iterates over
   * it... If there's a checkbox that's 'checked' this checkbox value is pushed into 
   * an array... If no checkbox was selected we consider that all rates should appear
   * on the result search. So an array of [1,2,3,4,5] is returned instead.
   * @param payload The info returned by an angular form
   */
  getSelectedRates(payload: any) {
    const desiredRates = payload.value.ratingFilter,
      ratingArray = [];

    for (const rate in desiredRates) {
      if (desiredRates.hasOwnProperty(rate)) {
        if (desiredRates[rate]) { ratingArray.push(+rate); }
      }
    }
    return (ratingArray.length) ? ratingArray : [1, 2, 3, 4, 5];
  }

  /**
   * @description This method will receive an object as argument(payload).
   * Based on this 'payload', it's gonna filter the result of listed hotels! 
   * @param payload 
   */
  filter(payload) {
    /**  INITIAL VARIABLES  */
    let filteredHotelsList = [];
    const MIN = this.priceRange[0],
          MAX = this.priceRange[1],
    ratingArray = this.getSelectedRates(payload);

    filteredHotelsList = this.intialHotelsList.filter((hotel) => {
      return (ratingArray.includes(hotel.rate)) &&
             (hotel.price >= MIN) &&
             (hotel.price <= MAX);
    });
    
    /**  
     * IF THIS ARRAY IS EMPTY ... TERMINATE THE FUNCTION 
    */
    if (!filteredHotelsList.length) {
      this.noFoundHotel = true;
      return false;
    } else {
      this.noFoundHotel = false;
      this.hotelsList = filteredHotelsList;
    }
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
