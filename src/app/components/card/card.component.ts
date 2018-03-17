import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardInfo') cardInfo;

  private image: string;
  private rate: number;
  private name: string;
  private description: string;
  private price: string;
  private priceHistory: [any];

  private onHistoryMode = false;
  
  constructor() { }
  
  ngOnInit() {
    this.image = this.cardInfo.image;
    this.rate = this.cardInfo.rate;
    this.name = this.cardInfo.name;
    this.description = this.cardInfo.description;
    this.price = this.cardInfo.price;
    this.priceHistory = this.cardInfo.priceHistory;
  }

  toggleHistoryMode(): void {
    this.onHistoryMode = !this.onHistoryMode;
  }
}
