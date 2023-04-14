import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Collection } from '../model/collection.model';
@Injectable({
  providedIn: 'root'
})
export class CollectionRealtimeService {
  collection: AngularFirestoreDocument<any>;
  collectionRef: AngularFirestoreCollection<Collection>;
  private dbPath = '/collection';
  // db: AngularFireStore
  constructor(private db: AngularFirestore) { 
    this.collectionRef = db.collection(this.dbPath);
  }

  create(collection: Collection): any {
    return this.collectionRef.add({ ...collection })
  }
}
