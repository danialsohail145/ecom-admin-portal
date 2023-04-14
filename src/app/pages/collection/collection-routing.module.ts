import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import { ViewCollectionComponent } from './components/view-collection/view-collection.component';

const routes: Routes = [
  {
    path:'add',
    component: AddCollectionComponent
  },
  {
    path:'view',
    component: ViewCollectionComponent
  },
  {
    path:'edit/:id',
    component: AddCollectionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
