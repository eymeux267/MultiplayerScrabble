import { ReserveLettres } from './reserveLettres';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

export class ListeReservesLettres {
    private listeUsagers : ListeUsagers;

    private listeReservesLettres : Array<ReserveLettres>;

    constructor(listeUsagers : ListeUsagers) {
        this.listeUsagers = listeUsagers;

        this.listeReservesLettres = [];
    }
    addReserve(roomID : string) : void {
        this.listeReservesLettres.push(new ReserveLettres(roomID));
    }

    isEmpty(roomID : string) : boolean {
    let index = this.findReserveLettresIndex(roomID);
    if (index !== -1) {
           return this.listeReservesLettres[index].isEmpty();
        }
    }
    removeReserve(roomID : string) : void {
        let index = this.findReserveLettresIndex(roomID);
        if (index !== -1) {
            this.listeReservesLettres.splice(index, 1);
        }
    }

    reserveLettreExiste(roomID : string) : boolean {
        let index = this.findReserveLettresIndex(roomID);
        if (index !== -1) {
            return true;
        }
        return false;
    }

    getNombreLettres(roomID : string) : number {
        let index = this.findReserveLettresIndex(roomID);
        if (index !== -1) {
            return this.listeReservesLettres[index].getNombreLettres();
        }
        return null;
    }

    getNewLettre(roomID : string) : string {
        let index = this.findReserveLettresIndex(roomID);
        if (index !== -1) {
            return this.listeReservesLettres[index].getNewLettre();
        }
        return null;
    }

    addLettresJoueur(socketId : string, nbLettres : number) : void {
        let roomID = this.listeUsagers.getUserRoomID(socketId);
        let index = this.findReserveLettresIndex(roomID);
        if (index !== -1) {
            for (let i = 0; i < nbLettres; i++) {
                console.log("UNE LETTRE FUT AJOUTEE A MON BOY");
                this.listeUsagers.ajouterLettre(socketId, this.listeReservesLettres[index].getNewLettre());
            }
        }
    }

    addLettreReserve(roomID : string, lettre : string) : void {
        let index = this.findReserveLettresIndex(roomID);
        if (index !== -1) {
            this.listeReservesLettres[index].addLettre(lettre);
        }
    }

    private findReserveLettresIndex(roomID : string) : number {
        for (let index = 0; index < this.listeReservesLettres.length; index++){
            if (roomID === this.listeReservesLettres[index].getReserveLettresRoomID()) {
                return index;
            }
        }
        return -1;
    }
}
