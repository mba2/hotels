import { HotelService } from './../../services/hotel.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rate-label',
  templateUrl: './rate-label.component.html',
  styleUrls: ['./rate-label.component.scss']
})
export class RateLabelComponent implements OnInit {
  @Input('fullStars') fullStars;
  @Input('emptyStars') emptyStars;

  constructor(public service: HotelService) { }

  private isActive = false;
  
  ngOnInit() {
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

}
