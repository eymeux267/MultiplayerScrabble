import { Pos } from './../pos/pos';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { Case } from './case';

const VERTICAL = false;
const HORIZONTAL = true;

const MOT = 0;
const POS = 1;
const ORIENTATION = 2;

export class CalculateurPoints{
    private plateau: Array<Array<Case>>;
    private listeUsagers: ListeUsagers;
    private roomID: string;
    private casesBonusQuiOntEteUtilisees: Array<Case>;

    constructor(plateau: Array<Array<Case>>, listeUsagers: ListeUsagers, roomID : string){
     this.plateau = plateau;
     this.listeUsagers = listeUsagers;
     this.roomID = roomID;
     this.casesBonusQuiOntEteUtilisees = [];
    }

    calculerPointsProduitsParNouveauxMots(nouveauxMotsCrees: Array<[string, Pos, boolean]>){
        let nbrDePoints = 0;
        for (let i = 0; i < nouveauxMotsCrees.length; i++){
            nbrDePoints += this.calculerPointsProduitsParMot(nouveauxMotsCrees[i][MOT], nouveauxMotsCrees[i][POS],
                        nouveauxMotsCrees[i][ORIENTATION]);
        }
        this.enleveBonusPlateau();
        return nbrDePoints;
    }

    calculerPointsProduitsParMot(mot: string, pos: Pos, orientation: boolean) {
        let points = 0;
        let nbrDeBonusMot = 0;
        let valeurDeBonusMot = 0;
        if (orientation === HORIZONTAL) {
            for (let i = pos.col; i < pos.col + mot.length; i++) {
                let pointsDeLettre = this.plateau[pos.row][i].getLettre().getValeurPoints();
                if (this.plateau[pos.row][i].getBonus() !== null) {
                    this.casesBonusQuiOntEteUtilisees.push(this.plateau[pos.row][i]);
                    if (!this.plateau[pos.row][i].getBonus().getBonusMot()) {
                        pointsDeLettre *= this.plateau[pos.row][i].getBonus().getValeurBonus();
                    }
                    else {
                        valeurDeBonusMot = this.plateau[pos.row][i].getBonus().getValeurBonus();
                        nbrDeBonusMot++;
                    }
                }
                points += pointsDeLettre;
            }
        }
        if (orientation === VERTICAL) {
            for (let i = pos.row; i < pos.row + mot.length; i++) {
                let pointsDeLettre = this.plateau[i][pos.col].getLettre().getValeurPoints();
                if (this.plateau[i][pos.col].getBonus() !== null) {
                    this.casesBonusQuiOntEteUtilisees.push(this.plateau[i][pos.col]);
                    if (!this.plateau[i][pos.col].getBonus().getBonusMot()) {
                        pointsDeLettre *= this.plateau[i][pos.col].getBonus().getValeurBonus();
                    }
                    else {
                        valeurDeBonusMot = this.plateau[i][pos.col].getBonus().getValeurBonus();
                        nbrDeBonusMot++;
                    }
                }
                points += pointsDeLettre;
            }
        }
        points *= Math.pow(valeurDeBonusMot, nbrDeBonusMot);
        return points;
    }

    private enleveBonusPlateau(): void {
        for (let i = 0; i < this.casesBonusQuiOntEteUtilisees.length; i++) {
           this.casesBonusQuiOntEteUtilisees[i].setBonus(null);
        }
    }
}
