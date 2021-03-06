import { Component, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { INCREMENT, DECREMENT, RESET, HOMEVALUE, AppState, Item, UPDATE_ITEM } from '../reducer';
import { ItemsService } from '../service';
import { Response } from '@angular/http';
const string = { Empty: "" };

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements AfterViewInit, OnDestroy {
  counter: Observable<number>;
  power: Observable<number>;
  homeValue: Observable<string>;
  homeValueInput: string;
  items: Observable<Array<Item>>;
  itemAdd: string = string.Empty;
  addItems: string = string.Empty;
  selectedItem: Item = null;
  numberOfTicks: number = 0;
  message: string = string.Empty;
  homeValueSubscription: Subscription;
  currentValueSubscription: Subscription;
  updateItemObservableSubscription: Subscription;
  currentItemsSubscription: Subscription;

  constructor(private store: Store<AppState>, private itemsService: ItemsService, private ref: ChangeDetectorRef) {
    this.counter = this.store.select<number>('count');
    this.power = this.counter.map((value) => Math.pow(2, value));
    this.homeValue = this.store.select<string>('data');
    this.homeValueSubscription = this.homeValue.subscribe(value => this.homeValueInput = value);
    this.items = this.store.select<Item[]>('items');
    setInterval(() => {
      this.numberOfTicks++;
      // the following is required, otherwise the view will not be updated
      // this.ref.markForCheck();
    }, 1000);
  }
  ngAfterViewInit() {
    let currentItems: Item[];
    this.currentItemsSubscription = this.store.select<Item[]>('items').subscribe(value => currentItems = value);
    if (currentItems.length === 0) {
      this.itemsService.loadItems();
    }
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
    this.currentValueSubscription = this.store.select<string>('data').subscribe(value => currentValue = value);
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
      this.itemAdd = string.Empty;
    }
  }
  getSelectedItem(item: Item) {
    this.selectedItem = item;
    this.itemAdd = item.name;
  }
  updateData() {
    if (this.selectedItem !== null && this.itemAdd.trim().length !== 0) {
      let item = Object.assign({}, this.selectedItem, { name: this.itemAdd.trim() });
      let updateItemObservable = this.itemsService.updateItem(item);
      this.updateItemObservableSubscription = updateItemObservable.subscribe(response => {
        if (response.ok === true) {
          this.store.dispatch({ type: UPDATE_ITEM, payload: item });
        } else {
          this.message = "Something went wrong. Unable to update.";
        }
      },
        error => { this.message = error; this.ref.markForCheck(); }
      );
      this.selectedItem = null;
      this.itemAdd = string.Empty;
    }
  }
  deleteData(item: Item) {
    this.itemsService.deleteItem(item);
    this.selectedItem = null;
    this.itemAdd = string.Empty;
  }
  ngOnDestroy() {
    this.homeValueSubscription && this.homeValueSubscription.unsubscribe();
    this.currentValueSubscription && this.currentValueSubscription.unsubscribe();
    this.updateItemObservableSubscription && this.updateItemObservableSubscription.unsubscribe();
    this.currentItemsSubscription && this.currentItemsSubscription.unsubscribe();
  }
}

