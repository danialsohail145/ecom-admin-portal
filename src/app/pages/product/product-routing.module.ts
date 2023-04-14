import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddSizeGuideComponent } from './components/add-size-guide/add-size-guide.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ViewSizeGuideComponent } from './components/view-size-guide/view-size-guide.component';

const routes: Routes = [
  {
    path:'add',
    component: AddProductComponent
  },
  {
    path:'edit/:id',
    component: AddProductComponent
  },
  {
    path:'view',
    component:ViewProductComponent
  },
  {
    path:'addSizeGuide',
    component:AddSizeGuideComponent
  },
  {
    path:'viewSizeGuide',
    component:ViewSizeGuideComponent
  },
  {
    path:'editSizeGuide/:id',
    component:AddSizeGuideComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
