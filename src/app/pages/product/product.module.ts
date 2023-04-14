import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'app/shared/loader/loader.module';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddSizeGuideComponent } from './components/add-size-guide/add-size-guide.component';
import { ViewSizeGuideComponent } from './components/view-size-guide/view-size-guide.component';
@NgModule({
  declarations: [
    AddProductComponent,
    ViewProductComponent,
    AddSizeGuideComponent,
    ViewSizeGuideComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderModule,
    NgMultiSelectDropDownModule
  ]
})
export class ProductModule { }
