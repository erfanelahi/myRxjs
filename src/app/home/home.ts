import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, HOMEVALUE, AppState } from '../reducer';

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {
  counter: Observable<number>;
  power: Observable<number>;
  homeValue: Observable<string>;
  homeValueInput: string;

  constructor(private store: Store<AppState>) {
    this.counter = store.select<number>('count');
    this.power = this.counter.map((value) => Math.pow(2, value));
    this.homeValue = store.select<string>('data');
    this.homeValue.subscribe(value => this.homeValueInput = value);
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
    this.store.dispatch({ type: HOMEVALUE, payload: value });
  }
}

