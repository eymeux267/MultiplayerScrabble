import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { Timer } from "./timer/timer";

export class GestionnaireTour {
    private io : SocketIO.Server;
    private listeUsagers : ListeUsagers;
    private timersList : Array<Timer>;

    constructor(serverio : SocketIO.Server, listeUsagers : ListeUsagers) {
        this.io = serverio;
        this.listeUsagers = listeUsagers;
        this.timersList = [];
    }

    determinerOrdre(roomID : string) : void {
        let listeOrdres : Array<number> = [];
        let listeJoueurs = this.listeUsagers.getUsersByRoomId(roomID);

        for (let i = 0; i < listeJoueurs.length; i++) {
            let estValide : boolean;
            do {
                estValide = true;
                let newOrdre = this.randomNumber(listeJoueurs.length);
                for (let j = 0; j < listeOrdres.length; j++) {
                    if (newOrdre === listeOrdres[j]) {
                        estValide = false;
                    }
                }
                if (estValide) {
                    this.listeUsagers.setOrdre(listeJoueurs[i], newOrdre);
                    listeOrdres.push(newOrdre);
                }
            } while (!estValide);
        }
    }

    // L'implementation du timer est de cette facon en attendant une reconfiguration
    // lors du sprint 4 qui va gerer plusieurs parties
    startTimer(roomID : string) : void {
        let nomJoueur = this.determinerTour(roomID);
        this.timersList.push(new Timer(this.io, roomID));
        this.timersList[this.timersList.length - 1].start(roomID, nomJoueur);
    }

    passer(roomID : string) : void {
        let nomJoueur = this.determinerTour(roomID);
        for (let timer of this.timersList) {
            if (timer.roomID === roomID) {
                timer.reset(roomID, nomJoueur);
                this.io.sockets.in(roomID).emit("fin-du-tour", nomJoueur, roomID);
            }
        }
    }

    private determinerTour(roomID : string) : string {
        let listeJoueurs = this.listeUsagers.getUsersByRoomId(roomID);
        let ordreCourant = 0;
        for (let i = 0; i < listeJoueurs.length; i++) {
            if (this.listeUsagers.estASonTour(listeJoueurs[i])) {
                this.listeUsagers.setASonTour(listeJoueurs[i], false);
                ordreCourant = this.listeUsagers.getOrdre(listeJoueurs[i]);
            }
        }
        for (let i = 0; i < listeJoueurs.length; i++) {
            if (this.listeUsagers.getOrdre(listeJoueurs[i]) === (ordreCourant % listeJoueurs.length + 1)) {
                this.listeUsagers.setASonTour(listeJoueurs[i], true);
                return this.listeUsagers.getUserName(listeJoueurs[i]);
            }
        }
        return null;
    }

    private randomNumber(max : number) : number {
        return Math.floor(Math.random() * max) + 1;
    }
}
