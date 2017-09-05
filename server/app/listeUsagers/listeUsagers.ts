import { Usager } from './usager';
import { ListeLettres } from './../listeLettres/listeLettres';
import { Lettre } from './../listeLettres/lettre';

export class ListeUsagers {
    private listeUsagers: Usager[] = [];

    addUsager(userName: string, socketId: string) : void {
        let user : Usager = { name : userName, id : socketId, roomID : "",
        listeLettres : new ListeLettres(), ordre : 0, aSonTour : false, score : 0};
        this.listeUsagers.push(user);
    }

    removeUsager(socketId: string) : void {
        let index = this.findUsagerIndex(socketId);
        if (index === -1) {
            console.log("Couldn't find user");
        }
        else {
            console.log("User name : " + this.listeUsagers[index].name + " removed from list");
            this.listeUsagers.splice(index, 1);
        }
    }

    setUserRoomID(socketId: string, roomID: string) : void {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            this.listeUsagers[index].roomID = roomID;
        }
    }

    getUserRoomID(socketId: string) : string {
        for (let index = 0; index < this.listeUsagers.length; index++) {
            if (this.listeUsagers[index].id === socketId) {
                return this.listeUsagers[index].roomID;
            }
        }
        return null;
    }

    getUsersByRoomId(roomId : string) : Array<string> {
        let listeSocketIds : Array<string> = [];
        for (let usager of this.listeUsagers) {
            if (usager.roomID === roomId) {
                listeSocketIds.push(usager.id);
            }
        }
        return listeSocketIds;
    }

    getUserObj(roomId : string) : Array<Usager>{
        let listeSocketIds : Array<Usager> = [];
        for (let usager of this.listeUsagers) {
            if (usager.roomID === roomId) {
                listeSocketIds.push(usager);
            }
        }
        return listeSocketIds;
    }
    findfirstPlayer(roomID : string ) : string {
        let usagers = this.getUserObj(roomID);
        let it : Usager;
        for ( it of usagers) {
            if (it.ordre === 1){
                return it.name;
            }
        }
        return "";
    }

    confirmUserName(userName: string) : boolean {
        let index: number;
        for (index = 0; index < this.listeUsagers.length; index++) {
            if (this.listeUsagers[index].name === userName) {
                return true;
            }
        }
        return false;
    }

    findUsagerIndex(socketId: string) : number {
        let index: number;
        for (index = 0; index < this.listeUsagers.length; index++) {
            if (this.listeUsagers[index].id === socketId) { return index; }
        }
        return -1;
    }

    getUserName(socketId: string) : string {
        return this.listeUsagers[this.findUsagerIndex(socketId)].name;
    }

    getUser(socketId: string) : Usager {
        return this.listeUsagers[this.findUsagerIndex(socketId)];
    }

    ajouterLettre(socketId: string, lettre : string) : void {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            this.listeUsagers[index].listeLettres.addLettre(lettre);
        }
    }

    removeLettre(socketId: string, lettre : string) : void {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            this.listeUsagers[index].listeLettres.removeLettre(lettre);
        }
    }

    getLettres(socketId : string) : Array<Lettre> {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            return this.listeUsagers[index].listeLettres.getLettres();
        }
        return null;
    }

    motPresent(socketId : string, mot : string) : boolean {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            for (let lettre of mot) {
                if (!this.listeUsagers[index].listeLettres.isLettrePresent(lettre)) {
                    return false;
                }
            }
            return true;
        }
        return null;
    }

    setOrdre(socketId : string, ordre : number) : void {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            this.listeUsagers[index].ordre = ordre;
        }
    }

    getOrdre(socketId : string) : number {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            return this.listeUsagers[index].ordre;
        }
    }

    trouverUsagerASonTour(roomID : string) : string {
        let usagers = this.getUsersByRoomId(roomID);
        for (let usager of usagers) {
            if (this.estASonTour(usager)) {
                return usager;
            }
        }
        return null;
    }

    estASonTour(socketId : string) : boolean {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            return this.listeUsagers[index].aSonTour;
        }
        return false;
    }

    setASonTour(socketId : string, estASonTour : boolean) : void {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            this.listeUsagers[index].aSonTour = estASonTour;
        }
    }

    getTableauListeUsagers(): Usager[]{
        return this.listeUsagers;
    }

    getScore(socketId : string) : number {
        let index = this.findUsagerIndex(socketId);
        if (index !== -1) {
            return this.listeUsagers[index].score;
        }
        return null;
    }
}

