import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './../models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = firestore.collection<User>('users');
   }

  createUser(user: User): any {
    delete user.id;
    return this.userCollection.add(user);
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  updateUser(user: User){
    var userId = user.id; 
    delete user.id;
    this.firestore.doc('users/' + userId).update(user);
}

  deleteUser(userId: string){
    this.firestore.doc('users/' + userId).delete();
  }

}
