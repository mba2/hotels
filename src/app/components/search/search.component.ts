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
  private checkInDate: string;
  private checkOutDate: string;
  private numberOfNights: string;

  private intialHotelsList = [];
  private hotelsList = [];
  private noFoundHotel = false;

  private priceRange = [100, 600];


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
   * @description This function gets the object binded to our form. Iterates over
   * it... If there's a checkbox that's 'checked' this checkbox value is pushed into 
   * an array... Then, this array is returned
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
    return ratingArray;
  }

  filterByRate(payload: any) {
    let filteredHotelsList = [];
    const ratingArray = this.getSelectedRates(payload);
    /** 
     * If no label was selected, we don't need to perform more computaion...
     * show the origin list returned via ajax, set the flag 'noFoundHotel' as false 
     * and terminate the function
    */
    if(!ratingArray.length) {
      this.hotelsList = this.intialHotelsList;
      this.noFoundHotel = false;
      return;
    }

    /**  
     * GETS A COPY OF A NEW LIST OF HOTELS, FILTERED BY RATING
    */
    filteredHotelsList = this.intialHotelsList.filter((hotel) => {
      return ratingArray.includes(hotel.rate);
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

  filterByPrice(payload: any) {

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
    /**  INITIAL VARIABLES  */
  
    /**  SETS THE PRICE FILTER */
    this.filterByPrice(payload);
    /**  SETS THE RATE FILTER */
    this.filterByRate(payload);
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
