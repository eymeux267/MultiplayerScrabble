import { ListeLettresReserve } from './listeLettresReserve';

export class ReserveLettres {
    private roomID : string;
    private reserveLettres : ListeLettresReserve;

    constructor(roomID : string) {
        this.roomID = roomID;
        this.reserveLettres = new ListeLettresReserve();

        this.setDefaultReserveLettre();
    }

    getNombreLettres() : number {
        return this.reserveLettres.getNombreLettres();
    }

    getNewLettre() : string {
        return this.reserveLettres.getRandomLettre();
    }

    addLettre(lettre : string) : void {
          this.reserveLettres.addLettre(lettre);
    }

    getReserveLettresRoomID() : string {
        return this.roomID;
    }

    isEmpty() : boolean {
        return (this.getNombreLettres() === 0);
    }
    private setDefaultReserveLettre() : void {
        this.reserveLettres.addLettre('A');
        this.reserveLettres.setQuantiteDisponible('A', 9);
        this.reserveLettres.addLettre('B');
        this.reserveLettres.setQuantiteDisponible('B', 2);
        this.reserveLettres.addLettre('C');
        this.reserveLettres.setQuantiteDisponible('C', 2);
        this.reserveLettres.addLettre('D');
        this.reserveLettres.setQuantiteDisponible('D', 3);
        this.reserveLettres.addLettre('E');
        this.reserveLettres.setQuantiteDisponible('E', 15);
        this.reserveLettres.addLettre('F');
        this.reserveLettres.setQuantiteDisponible('F', 2);
        this.reserveLettres.addLettre('G');
        this.reserveLettres.setQuantiteDisponible('G', 2);
        this.reserveLettres.addLettre('H');
        this.reserveLettres.setQuantiteDisponible('H', 2);
        this.reserveLettres.addLettre('I');
        this.reserveLettres.setQuantiteDisponible('I', 8);
        this.reserveLettres.addLettre('J');
        this.reserveLettres.setQuantiteDisponible('J', 1);
        this.reserveLettres.addLettre('K');
        this.reserveLettres.setQuantiteDisponible('K', 1);
        this.reserveLettres.addLettre('L');
        this.reserveLettres.setQuantiteDisponible('L', 5);
        this.reserveLettres.addLettre('M');
        this.reserveLettres.setQuantiteDisponible('M', 3);
        this.reserveLettres.addLettre('N');
        this.reserveLettres.setQuantiteDisponible('N', 6);
        this.reserveLettres.addLettre('O');
        this.reserveLettres.setQuantiteDisponible('O', 6);
        this.reserveLettres.addLettre('P');
        this.reserveLettres.setQuantiteDisponible('P', 2);
        this.reserveLettres.addLettre('Q');
        this.reserveLettres.setQuantiteDisponible('Q', 1);
        this.reserveLettres.addLettre('R');
        this.reserveLettres.setQuantiteDisponible('R', 6);
        this.reserveLettres.addLettre('S');
        this.reserveLettres.setQuantiteDisponible('S', 6);
        this.reserveLettres.addLettre('T');
        this.reserveLettres.setQuantiteDisponible('T', 6);
        this.reserveLettres.addLettre('U');
        this.reserveLettres.setQuantiteDisponible('U', 6);
        this.reserveLettres.addLettre('V');
        this.reserveLettres.setQuantiteDisponible('V', 2);
        this.reserveLettres.addLettre('W');
        this.reserveLettres.setQuantiteDisponible('W', 1);
        this.reserveLettres.addLettre('X');
        this.reserveLettres.setQuantiteDisponible('X', 1);
        this.reserveLettres.addLettre('Y');
        this.reserveLettres.setQuantiteDisponible('Y', 1);
        this.reserveLettres.addLettre('Z');
        this.reserveLettres.setQuantiteDisponible('Z', 1);
        this.reserveLettres.addLettre('*');
        this.reserveLettres.setQuantiteDisponible('*', 2);
    }
}
