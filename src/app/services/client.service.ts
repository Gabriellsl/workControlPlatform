import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Client } from '../models/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientCollection: AngularFirestoreCollection<Client>;
  constructor(private firestore: AngularFirestore) { 
    this.clientCollection = firestore.collection<Client>('clients');
  }

  createClient(client: Client): any {
    delete client.id;
    return this.clientCollection.add(client);
  }

  getClients() {
    return this.firestore.collection('clients').snapshotChanges();
  }

  updateClient(client: Client){
    var clientId = client.id; 
    delete client.id;
    this.firestore.doc('clients/' + clientId).update(client);
}

  deleteClient(clientId: string){
    this.firestore.doc('clients/' + clientId).delete();
  }
}
