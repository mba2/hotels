import { HotelService } from './../../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private checkInDate: any;
  private checkOutDate: any;
  
  constructor(
    private router: Router,
    private routeInfo: ActivatedRoute,
    private service: HotelService
  ) {
    this.checkInDate = this.routeInfo.snapshot.queryParamMap.get('checkin');
    this.checkOutDate = this.routeInfo.snapshot.queryParamMap.get('checkout');
  }

  ngOnInit() {
    this.onSearchMade();
  }

  onSearchMade() {
    this.service
      .onSearchMade$
      .subscribe( payload => {
        console.log(payload);
        this.checkInDate = payload.checkInDate;
        this.checkOutDate = payload.checkOutDate;
      });
  }


}
