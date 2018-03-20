import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private menuIsOpened = false;

  constructor() { }

  /** 
   * @description A void method to show/hide the menu 
  */
  private toggleMenu(): void {
    this.menuIsOpened = !this.menuIsOpened;
  }
  
  ngOnInit() {
  }

}
