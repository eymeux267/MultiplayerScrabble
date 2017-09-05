import { Injectable } from '@angular/core';
import { SocketIOService } from './../SocketIOService/socketIOService';
import { Lettre } from './../lettre/lettre';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChevaletService {
  private socket : SocketIOClient.Socket;

  constructor(private socketIOService : SocketIOService) {
    this.socket = socketIOService.socket;
    this.listenConfirmationLettresChangees();
  }

  getLettres() : Observable<Array<Lettre>> {
    let observable = new Observable(observer => {
        this.socket.on('lettres-joueur', (lettres : Array<string>, valeurs : Array<number>) => {
          let nouvelleListeLettres : Array<Lettre> = [];
          for (let i = 0; i < lettres.length; i++) {
            nouvelleListeLettres.push(new Lettre(lettres[i], valeurs[i]));
            console.log("Nouvelle lettre recu : " + lettres[i] + " de valeur : " + valeurs[i]);
          }
          observer.next(nouvelleListeLettres);
        });
    });
    return observable;
  }

  listenConfirmationLettresChangees(){
   this.socket.on('plateau-est-change', (lettresAChanger : string) => {
     console.log("jai reussi confirmation plateau-est-change");
     this.socket.emit('mettre-a-jour-reserve', lettresAChanger);
  });
  }
}
