export class GetHigherHistoryPrice {
  private priceHistory = [
    {value: 10},
    {value: 44},
    {value: 48.7},
    {value: 15},
    {value: 4}
  ];

  constructor() {}


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