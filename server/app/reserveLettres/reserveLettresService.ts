import { ListeReservesLettres } from './listeReservesLettres';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { Lettre } from './../listeLettres/lettre';
import { Verificateur } from "./../plateau/verificateur";
import { Usager } from './../listeUsagers/usager';

export class ReserveLettresService {
  private io: SocketIO.Server;
  private listeUsagers: ListeUsagers;

  private listeReservesLettres: ListeReservesLettres;

  constructor(serverio: SocketIO.Server, listeUsagers: ListeUsagers) {
    this.io = serverio;
    this.listeUsagers = listeUsagers;

    this.listeReservesLettres = new ListeReservesLettres(listeUsagers);
  }

  listenToReserveLettresRequests(socket: SocketIO.Socket): void {
    socket.on('join-game', () => {
      let roomID = this.listeUsagers.getUserRoomID(socket.id);
      if (!this.listeReservesLettres.reserveLettreExiste(roomID)) {
        this.listeReservesLettres.addReserve(roomID);
      }
      this.listeReservesLettres.addLettresJoueur(socket.id, 7);

      this.emitListeLettresUsagerChange(socket);
      this.emitReserveChange(socket, roomID);
    });
    // TODO : socket.on('leave-game', () => {});
  }

  listenToPlateauEstChange(socket: SocketIO.Socket): void {
    socket.on('mettre-a-jour-reserve', (lettresAChanger: string) => {
      console.log("jai recu mettre-a-jour-reserve " + "socket:" + socket.id + "lettres a changer: " + lettresAChanger);
      if (lettresAChanger !== "") {
        this.reactToCommandRequests(socket, "!tirerDeLaReserve", lettresAChanger);
      }
    });
  }

  ajustementScoreFinPartie(usagersDuRoom: Array<Usager>): void {
    let valeurPoint = 0;
    let indexJoueurASonTour;
    let it = 0;

    for (let i = 0; i < usagersDuRoom.length; i++){
      if (usagersDuRoom[i].aSonTour){
        indexJoueurASonTour = i;
      }
    }

    let ordre = usagersDuRoom[indexJoueurASonTour].ordre;
    ordre--;
    if (ordre === 0) {
      ordre = usagersDuRoom.length;
    }

    for (let i = 0; i < usagersDuRoom.length; i++) {
      if (usagersDuRoom[i].ordre !== ordre) {
        for (let j = 0; j < usagersDuRoom[i].listeLettres.getLettres().length; j++) {
          it = usagersDuRoom[i].listeLettres.getLettres()[j].getValeurPoints();
          if (it !== undefined) {
            valeurPoint += it;
            console.log("soustraire de : " + usagersDuRoom[i].name);
            usagersDuRoom[i].score -= it;
            console.log("score de : " + usagersDuRoom[i].score);
            if (usagersDuRoom[i].score < 0) {
              usagersDuRoom[i].score = 0;
            }
          }
        }
      }
    }

    for (let i = 0; i < usagersDuRoom.length; i++) {
      console.log("!!!!!!!!!!!!!!!!");
      if (usagersDuRoom[i].ordre === ordre) {
        console.log("le boy a son tour est : " + usagersDuRoom[indexJoueurASonTour].name);
        console.log("score a rajouter au boy : " + valeurPoint);
        usagersDuRoom[i].score += valeurPoint;
        console.log("score du boy a son tour " + usagersDuRoom[indexJoueurASonTour].score);
      }
    }
  }

  emitGameOver(socket: SocketIO.Socket, roomID: string): void {
    let usagersDuRoom = this.listeUsagers.getUserObj(roomID);
    this.ajustementScoreFinPartie(usagersDuRoom);
    let scoreGagnant = 0;
    let gagnant: string;

    for (let i = 0; i < usagersDuRoom.length; i++) {
      console.log("sscore de " + usagersDuRoom[i].name + " est " + usagersDuRoom[i].score);
      if (usagersDuRoom[i].score > scoreGagnant) {
        scoreGagnant = usagersDuRoom[i].score;
        gagnant = usagersDuRoom[i].name;
      }
    }
    this.io.sockets.in(roomID).emit('fin-partie', gagnant);
  }

  emitReserveChange(socket: SocketIO.Socket, roomID: string): void {
    this.io.sockets.in(roomID).emit('nbLettres-reserve', this.listeReservesLettres.getNombreLettres(roomID));
  }

  emitListeLettresUsagerChange(socket: SocketIO.Socket): void {
    let listeLettresJoueur = this.listeUsagers.getLettres(socket.id);
    let lettres: Array<string> = [];
    let valeurs: Array<number> = [];
    for (let lettre of listeLettresJoueur) {
      lettres.push(lettre.getLettre());
      valeurs.push(lettre.getValeurPoints());
      console.log("Lettre : " + lettre.getLettre() + " de valeur : " + lettre.getValeurPoints());
    }
    let promise = new Promise<null>((resolve) => { socket.emit('lettres-joueur', lettres, valeurs); resolve(); });
    promise.then(() => {
      let roomID = this.listeUsagers.getUserRoomID(socket.id);
      let usagers = this.listeUsagers.getUsersByRoomId(roomID);
      let noms: Array<string> = [];
      let scores: Array<number> = [];
      let nbLettres: Array<number> = [];
      for (let usager of usagers) {
        noms.push(this.listeUsagers.getUserName(usager));
        scores.push(this.listeUsagers.getScore(usager));
        nbLettres.push(this.calculerNbrLettres(this.listeUsagers.getLettres(usager)));
      }
      console.log("je emit un nouvo tableau de joueur");
      console.log("noms: " + noms);
      console.log("scores: " + scores);
      console.log("nbr lettres: " + nbLettres);
      this.io.sockets.in(roomID).emit('tableau-joueurs', noms, scores, nbLettres);
    }
    );
  }

  calculerNbrLettres(lettres: Lettre[]) {
    let nbrLettres = 0;
    for (let i = 0; i < lettres.length; i++) {
      if (lettres[i].getLettre() !== null) {
        nbrLettres++;
      }
    }
    return nbrLettres;
  }

  verifierAttributsSontDansChevalet(socketid: string, attributs: string): boolean {
    let usager = this.listeUsagers.getUser(socketid);
    let chevaletUsager: Array<string> = [];
    for (let i = 0; i < usager.listeLettres.getLettres().length; i++) {
      chevaletUsager.push(usager.listeLettres.getLettres()[i].getLettre());
    }
    for (let i = 0; i < attributs.length; i++) {
      let lettreEstDansChevalet = false;
      for (let j = 0; j < chevaletUsager.length && !lettreEstDansChevalet; j++) {
        if (attributs[i].toUpperCase() === chevaletUsager[j].toUpperCase()) {
          lettreEstDansChevalet = true;
          chevaletUsager.splice(j, 1);
          j--;
        }
      }
      if (!lettreEstDansChevalet) {
        return false;
      }
    }
    return true;
  }

  reactToCommandRequests(socket: SocketIO.Socket, commande: string, attributs: string): void {
    console.log("attributs: " + attributs);
    if (commande === "!changer" && this.listeUsagers.getUser(socket.id).listeLettres.getNombreLettres() === 7) {
      let roomID = this.listeUsagers.getUserRoomID(socket.id);
      console.log("Lettre(s) a changer : " + attributs);
      if (this.verifierAttributsSontDansChevalet(socket.id, attributs)) {
        for (let i = 0; i < attributs.length; i++) {
          this.listeUsagers.removeLettre(socket.id, attributs[i].toUpperCase());
          this.listeReservesLettres.addLettresJoueur(socket.id, 1);
        }
        this.emitReserveChange(socket, roomID);
        this.emitListeLettresUsagerChange(socket);
        this.io.sockets.in(roomID).emit("fin-de-tour-du-joueur");
      }
    }

    if (commande === "!tirerDeLaReserve" && attributs !== "") {
      let attributsASeparer = attributs.split(" ", 2);
      let mot = attributsASeparer[1].toUpperCase();
      if (this.listeUsagers.motPresent(socket.id, mot)) {
        setTimeout(() => {
          let roomID = this.listeUsagers.getUserRoomID(socket.id);
          console.log("Lettre(s) a changer : " + mot);
          if (Verificateur.INSERTION_APPROUVE === true) {
            if (mot.length === 7) {
              this.listeUsagers.getUser(socket.id).score += 50;  // BINGO.
            }
            if (this.listeReservesLettres.isEmpty(roomID)) {
              this.emitGameOver(socket, roomID);
            }
            for (let i = 0; i < mot.length; i++) {
              this.listeUsagers.removeLettre(socket.id, mot[i]);
              this.listeReservesLettres.addLettresJoueur(socket.id, 1);
            }
            this.emitReserveChange(socket, roomID);
            this.emitListeLettresUsagerChange(socket);
          }
        }, 500);
      }
    }
  }
}

/*
// Socket.io cheat sheet
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
*/
