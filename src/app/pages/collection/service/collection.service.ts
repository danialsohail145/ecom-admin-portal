import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Collection } from '../model/collection.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private dbPath = '/collection';
  collectionRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { 
    this.collectionRef = db.list(this.dbPath);
  }


  AddCollection(collection: Collection) {
    let obj = {
      id: uuidv4(),
      name: collection.name,
      image: collection.image,
    }
    this.collectionRef.push(obj);

  }

  GetCollection() {
    this.collectionRef = this.db.list('collection');
    return this.collectionRef;
  }
  getAllCollection() {
    return this.collectionRef;
  }
  getCollectionById(id : string){
    let collection = this.db.object(`collection/${id}`)
    return collection;
  }
  updateCollection(key: string, id : string, collection: Collection){
    let obj = {
      id: uuidv4(),
      name: collection.name,
      image: collection.image,
    }
    return this.collectionRef.update(key, obj);
  }
}
