import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HotelService {

  public onSearchMade$: EventEmitter<any> = new EventEmitter();

  constructor() { }


  search(payload) {
    this.onSearchMade$.emit(payload);
  }
}
