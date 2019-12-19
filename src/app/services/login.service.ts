import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: any;
  //autenticacao: FirebaseAuthState;
  nome: string;
  root: number;

  constructor(public firebaseauth: AngularFireAuth) {

    firebaseauth.user.subscribe((data =>{
      this.user= data;
      }));
   }

   public login(usuario: string,senha: string): void{
    this.firebaseauth.auth.signInWithEmailAndPassword(usuario , senha).then(() =>{
     
    localStorage.setItem("user",usuario);
    // this.nav.navigateForward("home");

    })
    .catch((erro:any)=>{

    });    
  }

  public cadastrar(usuario:string,senha:string): void{
    this.firebaseauth.auth.createUserWithEmailAndPassword(usuario, senha).then(() => {
      // this.nav.navigateForward("home");  
    })
    .catch((erro:any) =>{
    });
   }

   public logout(): void{
    this.firebaseauth.auth.signOut().then(() =>{
      localStorage.removeItem("user");
    })
    .catch((erro:any) =>{
    });
   }
}
