import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { routes } from './lazy.routing';
import { LazyComponent } from './lazy.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LazyComponent
  ]
})

export class LazyModule {}

