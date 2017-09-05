import { Pos } from './../pos/pos';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { Lettre } from './../listeLettres/lettre';
import { Case } from './case';
import { GestionnaireDictionnaire } from './../dictionnaire/gestionnaireDictionnaire';

const VERTICAL = false;
const HORIZONTAL = true;

const MOT = 0;

export class Verificateur {
    public static INSERTION_APPROUVE = false;
    private io: SocketIO.Server;
    private plateau: Array<Array<Case>>;
    private dictionnaire: GestionnaireDictionnaire;
    private listeUsagers: ListeUsagers;
    private roomID: string;
    //array de nouveaux mots creer avec mot, pos et orientation.
    private nouveauxMotsCrees: Array<[string, Pos, boolean]>;


    constructor(plateau: Array<Array<Case>>, listeUsagers: ListeUsagers, roomID: string, serverio : SocketIO.Server) {
        this.io = serverio;
        this.plateau = plateau;
        this.dictionnaire = new GestionnaireDictionnaire();
        this.listeUsagers = listeUsagers;
        this.roomID = roomID;
        this.nouveauxMotsCrees = [];
    }

    getNouveauxMotsCrees(): Array<[string, Pos, boolean]>{
        return this.nouveauxMotsCrees;
    }

    public verifierMot(mot: string, pos: Pos, orientation: boolean): boolean {
        if (this.verifierMotEstInserable(mot, pos, orientation)){
            this.trouverNouveauxMotsFormes(mot, pos, orientation);
            if (this.verifierNouveauxMotsSontDansDictionnaire()){
                 return true;
            }
            else{
                return false; // Faut changer pour finir le tour du boy.
            }
        }
        else {
            return false;
        }
    }

    private verifierMotEstInserable(mot: string, pos: Pos, orientation: boolean){
        return this.verifierPremiereInsertionMilieu(mot, pos, orientation)
            && this.verifierMotPlateau(mot, pos, orientation) && this.verifierMotJoueur(mot, pos, orientation)
            && this.verifierMotToucheAuMoinsUneAutreLettre(mot, pos, orientation);
    }

    private verifierNouveauxMotsSontDansDictionnaire(){
        for (let i = 0; i < this.nouveauxMotsCrees.length; i++){
            if (!this.verifierMotDictionnaire(this.nouveauxMotsCrees[i][MOT])){
                return false;
            }
        }
        return true;
    }

    verifierMotDictionnaire(mot: string): boolean {
        return this.dictionnaire.trouverMot(mot);
    }

    private verifierMotJoueur(mot: string, pos: Pos, orientation: boolean): boolean {
        let usager = this.listeUsagers.trouverUsagerASonTour(this.roomID);
        let lettre = copy(this.listeUsagers.getLettres(usager));
        let it;
        if (orientation === VERTICAL) {
            for (let i = 0; i < mot.length; i++) {
                it = this.plateau[pos.row + i][pos.col].getLettre();
                if (it !== null && it.getLettre() === mot[i]) {
                    lettre.push(it);
                }
            }
        }
         if (orientation === HORIZONTAL) {
            for (let i = 0; i < mot.length; i++) {
                it = this.plateau[pos.row][pos.col + i].getLettre();
                if (it !== null && it.getLettre() === mot[i]) {
                    lettre.push(it);
                }
            }
        }
        return this.motPresent(lettre, mot);
    }

    private verifierMotPlateau(mot: string, pos: Pos, orientation: boolean): boolean {
        if (orientation === VERTICAL) {
            if (mot.length > this.plateau.length - (pos.row)) {
                return false;
            }
            for (let i = 0; i < mot.length; i++) {
                if (this.plateau[pos.row + i][pos.col].getLettre() !== null
                    && this.plateau[pos.row + i][pos.col].getLettre().getLettre() !== mot[i]) {
                    return false;
                }
            }
        }
        else if (orientation === HORIZONTAL) {
            if (mot.length > this.plateau[0].length - (pos.col)) {
                return false;
            }
            for (let i = 0; i < mot.length; i++) {
                if (this.plateau[pos.row][pos.col + i].getLettre() !== null
                    && this.plateau[pos.row][pos.col + i].getLettre().getLettre() !== mot[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    verifierPremiereInsertionMilieu(mot: string, pos: Pos, orientation: boolean) {
        if (this.plateauEstVide()) {
            if (!this.bonnePremiereInsertion(mot, pos, orientation)) {
                return false;
            }
        }
        return true;
    }

    private plateauEstVide(): boolean {
        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau[i].length; j++) {
                if (this.plateau[i][j].getLettre() !== null) {
                    return false;
                }
            }
        }
        return true;
    }

    private bonnePremiereInsertion(mot: string, pos: Pos, orientation: boolean): boolean {
        let posCaseMilieu = 7;
        if (orientation === VERTICAL) {
            if (pos.row <= posCaseMilieu && ((pos.row + mot.length) > posCaseMilieu)
                && (pos.col === posCaseMilieu)) {
                return true;
            }
        }
        if (orientation === HORIZONTAL) {
            if (pos.col <= posCaseMilieu && ((pos.col + mot.length) > posCaseMilieu)
                && (pos.row === posCaseMilieu)) {
                return true;
            }
        }
        return false;
    }

    private verifierMotToucheAuMoinsUneAutreLettre(mot: string, pos: Pos, orientation: boolean): boolean {
        if (this.plateauEstVide())  // Ne pas verifier si cest la premiere insertion.
        {
            return true;
        }
        if (orientation === HORIZONTAL) {
            for (let i = 0; i < mot.length; i++) {
                let posAVerifier = new Pos(pos.row, pos.col + i);
                if (this.verifierCaseToucheAuMoinsUneAutreLettre(posAVerifier, orientation)) {
                    return true;
                }
            }
        }
        if (orientation === VERTICAL) {
            for (let i = 0; i < mot.length; i++) {
                let posAVerifier = new Pos(pos.row + i, pos.col);
                if (this.verifierCaseToucheAuMoinsUneAutreLettre(posAVerifier, orientation)) {
                    return true;
                }
            }
        }
        return false;
    }

    private verifierCaseToucheAuMoinsUneAutreLettre(pos: Pos, orientation: boolean): boolean {
        let casesAVerifier = new Array();
        if (pos.row - 1 >= 0) {
            casesAVerifier.push(this.plateau[pos.row - 1][pos.col].getLettre());
        }
        if (pos.col - 1 >= 0) {
            casesAVerifier.push(this.plateau[pos.row][pos.col - 1].getLettre());
        }
        if (pos.row + 1 < this.plateau.length) {
            casesAVerifier.push(this.plateau[pos.row + 1][pos.col].getLettre());
        }
        if (pos.col + 1 < this.plateau.length) {
            casesAVerifier.push(this.plateau[pos.row][pos.col + 1].getLettre());
        }

        for (let i = 0; i < casesAVerifier.length; i++) {
            if (casesAVerifier[i] !== null) {
                return true;
            }
        }
        return false;
    }

    motPresent(arrayLettre : Array<Lettre>, mot : string) : boolean {
        let usager = this.listeUsagers.trouverUsagerASonTour(this.roomID);
        let lettre = copy(this.listeUsagers.getLettres(usager));

        let myArr = new Array<string>();
        let myArr2 = new Array<string>();
        for (let i = 0 ; i < arrayLettre.length; i++){
            myArr.push(arrayLettre[i].getLettre());
        }
        for (let i = 0 ; i < lettre.length; i++){
            myArr2.push(lettre[i].getLettre());
        }

        for (let i = 0 ; i < mot.length ; i++){
            console.log("la lettre " + mot[i]);
            console.log(myArr);
            console.log(myArr.indexOf(mot[i]));
            if (myArr.indexOf(mot[i]) === -1){
                if (myArr2.indexOf('*') !== -1 ){
                    this.listeUsagers.removeLettre(usager, "*");
                    this.listeUsagers.ajouterLettre(usager, (mot[i]) );
                }
                else{
                    console.log("not good");
                    return false;
                }

           }
           else {
               myArr.splice(myArr.indexOf(mot[i]), 1);
           }
        }
        return true;
     }

    private trouverNouveauxMotsFormes(mot: string, pos: Pos, orientation: boolean): void{
        let plateauAvecNouvellesLettres: Array<Array<Case>> = [];
        for (let i = 0; i < this.plateau.length; i++){
            let ligne = [];
            for (let j = 0; j < this.plateau.length; j++){
                ligne.push(Object.create(this.plateau[i][j]));
            }
            plateauAvecNouvellesLettres.push(ligne);
        }
        let posrow: number = pos.row;
        let poscol: number = pos.col;
        this.mettreNouvellesLettresPlateau(mot, pos, orientation, plateauAvecNouvellesLettres);
        if (orientation === HORIZONTAL){
            poscol = this.getPosColDuDebutDuMotHorizontal(posrow, poscol, plateauAvecNouvellesLettres);
            this.ajouterMotHorizontal(posrow, poscol, plateauAvecNouvellesLettres);
            poscol = this.getPosColDuDebutDuMotHorizontal(posrow, poscol, plateauAvecNouvellesLettres);
            for (let i = poscol; i < poscol + mot.length + 1; i++){
                if (plateauAvecNouvellesLettres[posrow][i].getLettre() !== null
                        && this.plateau[posrow][i].getLettre() === null) {
                    let posrowDuParcours;
                    posrowDuParcours = this.getPosRowDuDebutDuMotVertical(posrow, i, plateauAvecNouvellesLettres);
                    this.ajouterMotVertical(posrowDuParcours, i, plateauAvecNouvellesLettres);
                }
            }
        }
        else if (orientation === VERTICAL){
            posrow = this.getPosRowDuDebutDuMotVertical(posrow, poscol, plateauAvecNouvellesLettres);
            this.ajouterMotVertical(posrow, poscol, plateauAvecNouvellesLettres);
            posrow = this.getPosRowDuDebutDuMotVertical(posrow, poscol, plateauAvecNouvellesLettres);
            for (let i = posrow; i < posrow + mot.length + 1; i++){
                if (plateauAvecNouvellesLettres[i][poscol].getLettre() !== null
                        && this.plateau[i][poscol].getLettre() === null){
                    let poscolDuParcours;
                    poscolDuParcours = this.getPosColDuDebutDuMotHorizontal(i, poscol, plateauAvecNouvellesLettres);
                    this.ajouterMotHorizontal(i, poscolDuParcours, plateauAvecNouvellesLettres);
                }
            }
        }
    }

    private getPosColDuDebutDuMotHorizontal(posrow: number, poscol: number, plateau: Array<Array<Case>>): number{
        // retourne en arriere jusqua ce que la case soit vide
        while (poscol > 0 && plateau[posrow][poscol - 1].getLettre() !== null){
                poscol--;
                 console.log("Je crash quand poscol = " + poscol);
        }
        console.log("Je me rends a la fin");
        return poscol;
    }

    private getPosRowDuDebutDuMotVertical(posrow: number, poscol: number, plateau: Array<Array<Case>>): number{
        // retourne en arriere jusqua ce que la case soit vide
        while (posrow > 0 && plateau[posrow - 1][poscol].getLettre() !== null){
                posrow--;
        }
        return posrow;
    }

    private ajouterMotHorizontal(posrow: number, poscol: number, plateau: Array<Array<Case>>){
        let motFormer = "";
        let nouveauMotPos = new Pos(posrow, poscol);
        let orientation = HORIZONTAL;
        while (poscol < plateau.length && plateau[posrow][poscol].getLettre() !== null){
            motFormer += plateau[posrow][poscol].getLettre().getLettre();
            poscol++;
        }
        if (motFormer.length > 1){
            console.log("Nouveau mot forme: " + motFormer);
            this.nouveauxMotsCrees.push([motFormer, nouveauMotPos, orientation]);
        }
    }

    private ajouterMotVertical(posrow: number, poscol: number, plateau: Array<Array<Case>>){
        let motFormer = "";
        let nouveauMotPos = new Pos(posrow, poscol);
        let orientation = VERTICAL;
        while (posrow < plateau.length && plateau[posrow][poscol].getLettre() !== null){
            motFormer += plateau[posrow][poscol].getLettre().getLettre();
            posrow++;
        }
        if (motFormer.length > 1){
            console.log("Nouveau mot forme: " + motFormer);
           this.nouveauxMotsCrees.push([motFormer, nouveauMotPos, orientation]);
        }
    }

    private mettreNouvellesLettresPlateau(mot: string, pos: Pos, orientation: boolean,
                                                        plateau: Array<Array<Case>>): void {
        if (orientation === VERTICAL) {
            for (let i = 0; i < mot.length; i++) {
                plateau[pos.row + i][pos.col].setLettre(new Lettre(mot[i]));
            }
        }
        else if (orientation === HORIZONTAL) {
            for (let i = 0; i < mot.length; i++) {
                plateau[pos.row][pos.col + i].setLettre(new Lettre(mot[i]));
            }
        }
    }

    determinerNomTour(roomID : string) : string {
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
}
function copy(arr: any){
    let newArr = arr.slice(0);
    for (let i = newArr.length; i--; ){
        if (newArr[i] instanceof Array){
            newArr[i] = copy(newArr[i]);
        }
    }
    return newArr;
}
