import { LettreReserve } from './lettreReserve';

export class ListeLettresReserve {
    protected listeLettres : Array<LettreReserve>;

    constructor() {
        this.listeLettres = [];
    }

    addLettre(newLettre : string) : void {
        let newLettreIndex = this.findLettreIndex(newLettre);
        if (newLettreIndex !== -1) {
            this.listeLettres[newLettreIndex].incrementerQuantiteDisponible();
        }
        else {
            this.listeLettres.push(new LettreReserve(newLettre, 1));
        }
    }

    removeLettre(lettre : string) : void {
        let lettreIndex = this.findLettreIndex(lettre);
        if (lettreIndex !== -1) {
            if (this.listeLettres[lettreIndex].getQuantiteDisponible() > 1) {
                this.listeLettres[lettreIndex].decrementerQuantiteDisponible();
            }
            else {
                this.listeLettres.splice(lettreIndex, 1);
            }
        }
    }

    getNombreLettres() : number {
        let nombreLettres = 0;
        for (let lettre of this.listeLettres){
            nombreLettres += lettre.getQuantiteDisponible();
        }
        return nombreLettres;
    }

    getQuantiteDisponible(lettre : string) : number {
        let lettreIndex = this.findLettreIndex(lettre);
        if (lettreIndex !== -1) {
            return this.listeLettres[lettreIndex].getQuantiteDisponible();
        }
        else {
            return -1;
        }
    }

    setQuantiteDisponible(lettre : string, newQuantiteDisponible : number) : void {
        let lettreIndex = this.findLettreIndex(lettre);
        if (lettreIndex !== -1) {
            this.listeLettres[lettreIndex].setQuantiteDisponible(newQuantiteDisponible);
        }
    }

    getRandomLettre() : string {
        let indexLettre = this.randomNumber(this.getNombreLettres());

        for (let lettre of this.listeLettres){
            if (indexLettre <= lettre.getQuantiteDisponible() && lettre.getQuantiteDisponible() > 0){
                this.removeLettre(lettre.getLettre());
                return lettre.getLettre();
            }
            else {
                indexLettre -= lettre.getQuantiteDisponible();
            }
        }
        return null;
    }

    isLettrePresent(lettre : string) : boolean {
        if (this.findLettreIndex(lettre) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    protected randomNumber(max : number) : number {
        return Math.floor(Math.random() * max) + 1;
    }

    protected findLettreIndex(lettre : string) : number {
        for (let index = 0; index < this.listeLettres.length; index++){
            if (lettre === this.listeLettres[index].getLettre()) {
                return index;
            }
        }
        return -1;
    }

    protected getValeurLettre(lettre : string) : number {
        return (new LettreReserve(lettre, 1)).getValeurPoints();
    }
}
