import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { flatMap } from 'rxjs/operators';
import { snapshotChanges } from '@angular/fire/database';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userCollection: AngularFirestoreCollection;

  //autenticacao: FirebaseAuthState;
  nome: string;
  root: number;
  user: User;

  constructor(private db: AngularFirestore) {
    this.userCollection = db.collection<User>('users');
   }

   public login(email, password){

      return this.db.collection<User>("users").ref.where("email","==",email)
  
  }

}
