import { ListeUsagers } from './../listeUsagers/listeUsagers';

export class Room {
  private nbJoueursMax : number;
  private roomFull : boolean;
  private roomID : string;
  private gameStarted : boolean;
  private listeUsagers : ListeUsagers;
  private nbJoueurs : number;

  constructor(nbJoueursMax: number, roomID: string, listeUsagers : ListeUsagers) {
    this.nbJoueursMax = nbJoueursMax;
    this.roomFull = false;
    this.roomID = roomID;
    this.gameStarted = false;
    this.listeUsagers = listeUsagers;
    this.nbJoueurs = 0;
  }

  addUser(socketId : string) : void {
    this.listeUsagers.setUserRoomID(socketId, this.roomID);
    console.log("User : " + socketId + " added to room : " + this.roomID);

    this.nbJoueurs++;
    if (this.nbJoueurs === this.nbJoueursMax) {
      this.roomFull = true;
      this.gameStarted = true;
    }
  }
  removeUser(socketId : string) : void {
    this.listeUsagers.setUserRoomID(socketId, null);
    console.log("User : " + socketId + " removed from room : " + this.roomID);

    if (this.nbJoueurs > 0) {
      this.nbJoueurs--;
    }

    this.roomFull = false;
  }

  getRoomID() : string {
    return this.roomID;
  }

  isRoomFull() : boolean {
    return this.roomFull;
  }

  isGameStarted() : boolean {
    return this.gameStarted;
  }
  getNbJoueurs() : number {
    return this.nbJoueurs;
  }
}
