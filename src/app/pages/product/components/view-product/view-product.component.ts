import { Component, OnInit } from "@angular/core";
import { Product } from "../../model/product.model";
import { ProductService } from "../../service/product.service";
import { map } from "rxjs";
import { CollectionService } from "app/pages/collection/service/collection.service";
import { Collection } from "app/pages/collection/model/collection.model";
import { MULTISELECT } from "app/constant/multiselectiondropdown";

@Component({
  selector: "view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.css"],
})
export class ViewProductComponent implements OnInit {
  isLoading: boolean = false;
  allProductList : Product[] = [];
  productList: Product[] = [];
  allCollection: Collection[] = [];

  dropdownSettings = MULTISELECT;
  selectedCollection: any[] = [];

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.initData();
  }
  initData() {
    this.isLoading = true;
    this.getAllCollection();
    this.productService
      .getAllProduct()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.allProductList = data;
        this.allProductList.filter((x) => this.filterProd(x));
        this.isLoading = false;
      });
  }

  filterProd(x) {
    console.log(this.selectedCollection);
    this.selectedCollection.forEach((selectCollection) => {
      if (x.collectionId === selectCollection.id) {
        this.productList.push(x);
      }
    });
    return;
  }

  getAllCollection() {
    this.collectionService
      .GetCollection()
      .valueChanges()
      .subscribe((res) => {
        this.allCollection = res;
        let selectArr = [];
        selectArr.push(this.allCollection[0]);
        this.selectedCollection = selectArr;
      });
  }
  onselectCollection(event){

    this.productList = [];
    this.allProductList.filter((x) => this.filterProd(x));
  }

  onSelectAllCollection(event){
    this.selectedCollection = event;
    this.productList = [];
    this.allProductList.filter((x) => this.filterProd(x));
  }

  // get filterCollection(collection: Collection[],key :string,value){
  //   collection.filter(x=>{

  //   })
  // }

  setFilter() {
    console.log("TEST");
  }
}
