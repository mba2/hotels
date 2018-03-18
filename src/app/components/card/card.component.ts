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
  private higherPrice: number;
  private priceHistory: [any];

  private onHistoryMode = false;
  
  constructor() { }
  
  ngOnInit() {
    this.image = this.cardInfo.image;
    this.rate = this.cardInfo.rate;
    this.name = this.cardInfo.name;
    this.description = this.cardInfo.description;
    this.price = this.cardInfo.price;
    this.priceHistory = this.cardInfo.price_history;
    this.higherPrice = this.getHigherHistoryPrice();
  }

  toggleHistoryMode(): void {
    this.onHistoryMode = !this.onHistoryMode;
  }

  /**
   * @description Returns the higher price of a hotel during 2017. This 
   * number will be used a reference to mount the chart
  */
  getHigherHistoryPrice(): number {
    let prices,
        higherPrice;

    prices = this.priceHistory.map( price => {
      return price.value;
    });
    higherPrice = Math.max.apply(null, prices);

    return higherPrice;
  }


  // getValuePerNight(): number {
  //   // console.log(this.price);
  //   // console.log(this.nights);
    
  //   return Math.round( (this.price as number) / this.nights);
  // }
}
