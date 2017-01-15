import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
})

export class LazyComponent {
  @ViewChild('formRef') formRef;
  ngAfterViewInit() {
    //this.formRef.valueChanges.subscribe(v => console.table(v));
  }
  onSubmit(formValues) {
    console.table(formValues);
  }
  locations: string[] = ["Home", "Away"];
}
