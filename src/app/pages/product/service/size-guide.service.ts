import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { SizeGuide } from '../model/sizeGuide.model';

@Injectable({
  providedIn: 'root'
})
export class SizeGuideService {

  private dbPath = '/sizeGuide';
  sizeGuideRef: AngularFireList<SizeGuide>;
  constructor(private db: AngularFireDatabase) { 
    this.sizeGuideRef = db.list(this.dbPath);
  }


  addSizeGuide(sizeGuide: SizeGuide) {    
    return this.sizeGuideRef.push(sizeGuide);
  }

  getSizeGuide() {
    this.sizeGuideRef = this.db.list('sizeGuide');
    return this.sizeGuideRef;
  }
  getAllSizeGuide() {
    return this.sizeGuideRef;
  }
  getSizeById(id : string){
    let size = this.db.object(`sizeGuide/${id}`)
    return size;
  }

  updateSizeGuide(key: string,size: SizeGuide) {    
    return this.sizeGuideRef.update(key,size);
  }
}
