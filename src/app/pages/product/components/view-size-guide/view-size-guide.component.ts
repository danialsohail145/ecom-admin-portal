import { Component, OnInit } from '@angular/core';
import { SizeGuideService } from '../../service/size-guide.service';
import { map } from 'rxjs';
import { SizeGuide } from '../../model/sizeGuide.model';

@Component({
  selector: 'view-size-guide',
  templateUrl: './view-size-guide.component.html',
  styleUrls: ['./view-size-guide.component.css']
})
export class ViewSizeGuideComponent implements OnInit {
  isLoading: boolean =false;
  sizeGuideList : SizeGuide[]
  constructor(
    private sizeGuideService:SizeGuideService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this.isLoading = true;
    this.sizeGuideService.getAllSizeGuide().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.sizeGuideList = data;
      this.isLoading = false;
    });

  }

}
