import { Component, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { INCREMENT, DECREMENT, RESET, HOMEVALUE, AppState, Item } from '../reducer';
import { ItemsService } from '../service';
const string = { Empty: "" };

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements AfterViewInit {
  counter: Observable<number>;
  power: Observable<number>;
  homeValue: Observable<string>;
  homeValueInput: string;
  items: Observable<Array<Item>>;
  itemAdd: string = string.Empty;
  addItems: string = string.Empty;
  selectedItem: Item = null;
  numberOfTicks: number = 0;

  constructor(private store: Store<AppState>, private itemsService: ItemsService, private ref: ChangeDetectorRef) {
    this.counter = this.store.select<number>('count');
    this.power = this.counter.map((value) => Math.pow(2, value));
    this.homeValue = this.store.select<string>('data');
    this.homeValue.subscribe(value => this.homeValueInput = value);
    this.items = this.itemsService.items;
    setInterval(() => {
      this.numberOfTicks++;
      // the following is required, otherwise the view will not be updated
      // this.ref.markForCheck();
    }, 1000);
  }
  ngAfterViewInit() {
    this.itemsService.loadItems();
  }
  increment() {
    this.store.dispatch({ type: INCREMENT });
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }
  setHomeValue(value) {
    let currentValue;
    this.store.select<string>('data').subscribe(value => currentValue = value);
    if (currentValue !== value) {
      this.store.dispatch({ type: HOMEVALUE, payload: value });
    }
  }
  getData() {
    this.itemsService.loadItems();
  }
  addData(value) {
    if (value.trim().length !== 0) {
      //this.addItems += `<li>${value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</li>`;
      this.itemsService.createItem({ id: new Date().getMilliseconds(), name: value.trim(), description: "This is a default description" });
      this.itemAdd = "";
    }
  }
  getSelectedItem(item: Item) {
    this.selectedItem = item;
    this.itemAdd = item.name;
  }
  updateData() {
    if (this.selectedItem !== null) {
      this.selectedItem.name = this.itemAdd;
      this.itemsService.updateItem(this.selectedItem);
      this.selectedItem = null;
      this.itemAdd = "";
    }
  }
  deleteData(item: Item) {
    this.itemsService.deleteItem(item);
    this.selectedItem = null;
    this.itemAdd = "";
  }
}

