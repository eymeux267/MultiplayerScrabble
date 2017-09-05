import { Plateau } from './plateau';
import { Lettre } from './../listeLettres/lettre';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

export class ListePlateaux {
    private listeUsagers: ListeUsagers;
    private listePlateaux: Array<Plateau>;
    private io: SocketIO.Server;


    constructor(listeUsagers: ListeUsagers, serverio : SocketIO.Server) {
        this.io = serverio;
        this.listeUsagers = listeUsagers;
        this.listePlateaux = [];
    }

    addPlateau(roomID: string): void {
        this.listePlateaux.push(new Plateau(roomID, this.listeUsagers, this.io));
    }

    removePlateau(roomID: string): void {
        let index = this.findPlateauIndex(roomID);
        if (index === -1) {
            console.log("Couldn't find plateau");
        }
        else {
            console.log("Plateau roomID : " + this.listePlateaux[index].getPlateauRoomID() + " removed from list");
            this.listePlateaux.splice(index, 1);
        }
    }

    plateauPresent(roomID: string): boolean {
        if (this.findPlateauIndex(roomID) > -1) {
            return true;
        } else {
            return false;
        }
    }

    insererMot(mot: string, posEtOrientation: string, roomID: string, socketid: string): boolean {
        let index = this.findPlateauIndex(roomID);
        if (index === -1) {
            console.log("Couldn't find plateau");
        }
        else {
            if (this.listePlateaux[index].insererMot(mot, posEtOrientation, socketid)) {
                console.log("Insertion du mot : " + mot + " dans plateau roomID : "
                    + this.listePlateaux[index].getPlateauRoomID() + " reussie");
                return true;
            } else {
                console.log("Insertion du mot : " + mot + " dans plateau roomID : "
                    + this.listePlateaux[index].getPlateauRoomID() + " echoue");
            }
        }
        return false;
    }

    getLettresPlateau(roomID: string): Array<Array<Lettre>> {
        let index = this.findPlateauIndex(roomID);
        if (index === -1) {
            console.log("Couldn't find plateau");
            return null;
        }
        else {
            return this.listePlateaux[index].getLettresPlateau();
        }
    }

    getPlateauByIndex(index: number){
        return this.listePlateaux[index];
    }

    findPlateauIndex(roomID: string): number {
        let index: number;
        for (index = 0; index < this.listePlateaux.length; index++) {
            if (this.listePlateaux[index].getPlateauRoomID() === roomID) {
                return index;
            }
        }
        return -1;
    }
}
