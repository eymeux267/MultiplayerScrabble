import { Lettre } from './lettre';

export class ListeLettres {
    private listeLettres : Array<Lettre>;

    constructor() {
        this.listeLettres = [];
    }

    addLettre(newLettre : string) : void {
        this.listeLettres.push(new Lettre(newLettre));
    }

    removeLettre(lettre : string) : void {
        let lettreIndex = this.findLettreIndex(lettre);
        if (lettreIndex !== -1) {
            this.listeLettres.splice(lettreIndex, 1);
        }
    }

    getNombreLettres() : number {
        let nombreLettres = 0;
        for (let i = 0; i < this.listeLettres.length; i++){
            nombreLettres++;
        }
        return nombreLettres;
    }

    isLettrePresent(lettre : string) : boolean {
        if (this.findLettreIndex(lettre) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }

    getLettres() : Array<Lettre> {
        return this.listeLettres;
    }

    public randomNumber(max : number) : number {
        return Math.floor(Math.random() * max) + 1;
    }

    private findLettreIndex(lettre : string) : number {
        for (let index = 0; index < this.listeLettres.length; index++) {
            if (lettre === this.listeLettres[index].getLettre()) {
                return index;
            }
        }
        return -1;
    }

    public getValeurLettre(lettre : string) : number {
        return (new Lettre(lettre)).getValeurPoints();
    }
}
