import { Injectable } from '@angular/core';
import { SocketIOService } from './../SocketIOService/socketIOService';
import { PLATEAU } from './cases-plateau';
import { Lettre } from './../lettre/lettre';

@Injectable()
export class PlateauService {
  private socket: SocketIOClient.Socket;

  constructor(private socketIOService: SocketIOService) {
    this.socket = socketIOService.socket;
    this.getPlateau();
  }

  getPlateau(): void {
    this.socket.on('plateau', (lettres: Array<Array<string>>, valeurs: Array<Array<number>>) => {
      let nouvelleListeLettres: Array<Array<Lettre>> = [[]];
      for (let i = 0; i < lettres.length; i++) {
        nouvelleListeLettres.push(new Array<Lettre>());
        for (let j = 0; j < lettres[i].length; j++) {
          nouvelleListeLettres[i].push(new Lettre(lettres[i][j], valeurs[i][j]));
          console.log("Nouvelle lettre recu : " + lettres[i] + " de valeur : " + valeurs[i]
            + " a placer sur le plateau");
        }
      }
      this.changerPlateau(nouvelleListeLettres);
    });
  }

  private changerPlateau(lettresPlateau: Array<Array<Lettre>>): void {
    for (let i = 0; i < PLATEAU.length; i++) {
      for (let j = 0; j < PLATEAU[i].length; j++) {
        PLATEAU[i][j].setLettre(lettresPlateau[i][j]);
      }
    }
  }
}
