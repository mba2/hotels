import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HotelService {

  public onSearchMade$: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }

  /**
   * 
   * @param payload 
   * @description This method will receive the info given by the Calendar Component and emit a custom event(onSearchMade$)
   */
  search(payload) {
    this.onSearchMade$.emit(payload);
  }

  getAll() {
    const url = 'https://www.raphaelfabeni.com.br/rv/hotels.json';

    return this.http.get(url);
  }
}
