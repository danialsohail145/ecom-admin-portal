import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../service/collection.service';
import { Collection } from '../../model/collection.model';
import { map } from 'rxjs';

@Component({
  selector: 'view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  isLoading: boolean = false;
  collectionList :Collection[];
  constructor(
    private collectionService : CollectionService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.isLoading = true;
    this.collectionService.getAllCollection().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.collectionList = data;
      console.log(this.collectionList);
      
      this.isLoading = false;
    });

  }
}
