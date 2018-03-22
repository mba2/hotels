import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public menuIsOpened = false;

  constructor() { }

  /** 
   * @description A void method to show/hide the menu 
  */
  toggleMenu(): void {
    this.menuIsOpened = !this.menuIsOpened;
  }
  
  ngOnInit() {
  }

}
