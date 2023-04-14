import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { ViewCollectionComponent } from './components/view-collection/view-collection.component';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { LoaderModule } from 'app/shared/loader/loader.module';

@NgModule({
  declarations: [
    ViewCollectionComponent,
    AddCollectionComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderModule
  ]
})
export class CollectionModule { }
