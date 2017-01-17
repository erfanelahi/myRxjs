import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppState, Item, GET_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from './reducer';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class ItemsService {

  constructor(private http: Http, private store: Store<AppState>) {
  }

  loadItems() {
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({ type: GET_ITEMS, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  //   saveItem(item: Item) {
  //     (item.id) ? this.updateItem(item) : this.createItem(item);
  //   }

  createItem(item: Item) {
    this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
      .map(payload => ({ type: CREATE_ITEM, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateItem(item: Item): Observable<Response> {
    return this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      // .map((res: Response) => res.json())
      // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteItem(item: Item) {
    this.http.delete(`${BASE_URL}${item.id}`)
      .subscribe(action => this.store.dispatch({ type: DELETE_ITEM, payload: item }));
  }
}
