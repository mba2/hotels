import { GetHigherHistoryPrice } from './getHigherHistoryPrice';


const test = new GetHigherHistoryPrice();


describe('Get Higher History Price', () => {
  it('should return 48.7', () => {
    const result = test.getHigherHistoryPrice();
    expect(result).toBe(48.7);
  });
});

