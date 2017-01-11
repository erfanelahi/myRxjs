import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, HOMEVALUE, AppState } from '../counter';

@Component({
  selector: 'home',
  styleUrls: ['./home.css'],
  templateUrl: './home.html'
})
export class Home {
  counter: Observable<number>;
  homeValue: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.counter = store.select<number>('count');
    this.homeValue = store.select<string>('data');
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

