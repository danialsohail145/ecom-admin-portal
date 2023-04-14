import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/product';
  productGuideRef: AngularFireList<Product>;
  constructor(
    private db: AngularFireDatabase
  ) { 
    this.productGuideRef = db.list(this.dbPath);
  }

  addProduct(product: Product) {    
    return this.productGuideRef.push(product);
  }
  getAllProduct() {
    return this.productGuideRef;
  }
  getProductById(id : string){
    let product = this.db.object(`product/${id}`)
    return product;
  }
  updateProduct(key: string,product: Product) {    
    return this.productGuideRef.update(key,product);
  }
}
