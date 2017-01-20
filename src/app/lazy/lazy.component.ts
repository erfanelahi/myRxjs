import { Component, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { HOMEVALUE, AppState } from '../reducer';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent implements OnDestroy {
  @ViewChild('formRef') formRef;
  ngAfterViewInit() {
    //this.formRef.valueChanges.subscribe(v => console.table(v));
  }
  onSubmit(formValues) {
    console.table(formValues);
  }
  locations: string[] = ["Home", "Away"];
  //------------------------------------
  homeValueLazy: Observable<string>;
  currentValueSubscriptionLazy: Subscription;
  constructor(private storeLazy: Store<AppState>) {
    this.homeValueLazy = this.storeLazy.select<string>('data');
  }
  setHomeValueLazy(value) {
    let currentValueLazy;
    this.currentValueSubscriptionLazy = this.storeLazy.select<string>('data').subscribe(value => currentValueLazy = value);
    if (currentValueLazy !== value) {
      this.storeLazy.dispatch({ type: HOMEVALUE, payload: value });
    }
  }
  ngOnDestroy() {
    this.currentValueSubscriptionLazy && this.currentValueSubscriptionLazy.unsubscribe();
  }
}
