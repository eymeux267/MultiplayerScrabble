import * as DICTIONNAIRE from './dictionnaire';

export class GestionnaireDictionnaire {

    trouverMot(mot : string) : boolean {
        mot = mot.toUpperCase();
        if (this.estDansDivisionUn(mot) || this.estDansDivisionDeux(mot) || this.estDansDivisionTrois(mot)) {
            return true;
            }
        return false;
    }
    estDansDivisionUn(mot : string) : boolean {
         if (DICTIONNAIRE.Dictionnaire.A.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.B.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.C.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.D.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.E.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.F.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.G.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.H.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else {
            return false;
        }
    }
    estDansDivisionDeux(mot : string) : boolean {
         if (DICTIONNAIRE.Dictionnaire.I.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.J.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.K.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.L.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.M.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.N.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.O.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.P.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.Q.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else {
        return false;
        }
    }
    estDansDivisionTrois(mot : string) : boolean{
        if (DICTIONNAIRE.Dictionnaire.R.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.S.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.T.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.U.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.V.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.W.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.X.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.Y.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else if (DICTIONNAIRE.Dictionnaire.Z.findIndex(x => x === mot) !== -1 ) {
            return true;
        }
        else {
        return false;
        }
    }
}
