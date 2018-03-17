import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardInfo') cardInfo;


  private rate;
  
  constructor() { }
  
  ngOnInit() {
    this.rate = this.cardInfo.rate;
  }

}
