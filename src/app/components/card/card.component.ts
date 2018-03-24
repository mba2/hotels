import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardInfo') cardInfo;
  @Input('nights') nights;

  public image: string;
  public rate: number;
  public name: string;
  public description: string;
  public price: number;
  public higherPrice: number;
  public priceHistory: [any];

  public onHistoryMode = false;
  
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
  
  /**
   * @description This function is responsable to show or hide the History price modal
  */
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
}
