import { Injectable } from '@angular/core';
import { SocketIOService } from './../SocketIOService/socketIOService';
import { Observable } from 'rxjs/Observable';
import { Usager } from "./../usager/usager";

@Injectable()
export class PanneauInformatifService {
  private socket : SocketIOClient.Socket;

  constructor(private socketIOService : SocketIOService) {
    this.socket = socketIOService.socket;
  }

  getNombreLettresReserve() : Observable<number> {
    let observable = new Observable(observer => {
        this.socket.on('nbLettres-reserve', (nbLettres : number) => {
          observer.next(nbLettres);
        });
    });
    return observable;
  }

  getTableauJoueurs() : Observable<Array<Usager>> {
    let observable = new Observable(observer => {
        this.socket.on('tableau-joueurs', (noms : Array<string>, scores : Array<number>, nbLettres : Array<number>) => {
          console.log("Je recois un new tableau de joueurs: ");
          console.log("Noms " + noms );
          console.log("Scores " + scores);
          console.log("nbLettres " + nbLettres);
          let nouveauTableauJoueurs : Array<Usager> = [];
          for (let i = 0; i < noms.length; i++) {
            let nouveauJoueur : Usager = { name : noms[i], score : scores[i], nbLettreChevalet : nbLettres[i] };
            nouveauTableauJoueurs.push(nouveauJoueur);
          }
          observer.next(nouveauTableauJoueurs);
        });
    });
    return observable;
  }

}
