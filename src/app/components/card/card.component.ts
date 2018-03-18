import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardInfo') cardInfo;
  @Input('nights') nights;

  private image: string;
  private rate: number;
  private name: string;
  private description: string;
  private price: number;
  private priceHistory: [any];

  private onHistoryMode = false;
  private valuePerNight: number;
  
  constructor() { }
  
  ngOnInit() {
    this.image = this.cardInfo.image;
    this.rate = this.cardInfo.rate;
    this.name = this.cardInfo.name;
    this.description = this.cardInfo.description;
    this.price = this.cardInfo.price;
    this.priceHistory = this.cardInfo.priceHistory;
    // this.valuePerNight = this.getValuePerNight();
  }

  toggleHistoryMode(): void {
    this.onHistoryMode = !this.onHistoryMode;
  }

  // getValuePerNight(): number {
  //   // console.log(this.price);
  //   // console.log(this.nights);
    
  //   return Math.round( (this.price as number) / this.nights);
  // }
}
