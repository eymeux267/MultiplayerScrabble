import { PLATEAU } from './cases-plateau';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { Pos } from './../pos/pos';
import { Lettre } from './../listeLettres/lettre';
import { Case } from './case';
import { GestionnaireDictionnaire } from './../dictionnaire/gestionnaireDictionnaire';
import { TSMap } from "typescript-map";
import { Verificateur } from "./verificateur";
import { CalculateurPoints } from "./calculateurpoints";
import * as lodash from "lodash";

const VERTICAL = false;
const HORIZONTAL = true;

let verticalPosMap: TSMap<string, number>;

export class Plateau {
    private io: SocketIO.Server;
    private verificateur : Verificateur;
    private listeUsagers: ListeUsagers;
    private plateau: Array<Array<Case>>;
    private listeMot : Array<string>;
    private roomID: string;
    private dictionnaire: GestionnaireDictionnaire;

    constructor(roomID: string, listeUsagers: ListeUsagers, serverIO : SocketIO.Server) {
        this.io = serverIO;
        this.listeUsagers = listeUsagers;
        this.listeMot = [];
        this.plateau = [[]];
        this.plateau = lodash.cloneDeep(PLATEAU);

        this.roomID = roomID;
        this.dictionnaire = new GestionnaireDictionnaire();
    }

    getLettresPlateau(): Array<Array<Lettre>> {
        let lettresPlateau: Array<Array<Lettre>> = [[]];

        for (let i = 0; i < this.plateau.length; i++) {
            lettresPlateau.push(new Array<Lettre>());
            for (let j = 0; j < this.plateau[i].length; j++) {
                lettresPlateau[i].push(this.plateau[i][j].getLettre());
            }
        }
        return lettresPlateau;
    }

    insererMot(mot: string, posEtOrientation: string, socketid: string): boolean {
        Verificateur.INSERTION_APPROUVE = false;
        mot = mot.toUpperCase();
        let pos = this.posMot(posEtOrientation);
        let orientation = this.orientationMot(posEtOrientation);
        this.verificateur = new Verificateur(this.plateau, this.listeUsagers, this.roomID, this.io);
        if (this.verificateur.verifierMot(mot, pos, orientation)) {
            this.mettreMotPlateau(mot, pos, orientation);
            Verificateur.INSERTION_APPROUVE = true;
            let nouveauxMotsCrees = this.verificateur.getNouveauxMotsCrees();
            let calculateurPts = new CalculateurPoints(this.plateau, this.listeUsagers, this.roomID);
            this.listeUsagers.getUser(socketid).score +=
                            calculateurPts.calculerPointsProduitsParNouveauxMots(nouveauxMotsCrees);
            console.log("Insertion du mot : " + mot + " dans la position(" + pos.row + ", " + pos.col + ")");
            this.io.sockets.in(this.roomID).emit("fin-de-tour-du-joueur");
            return true;
        }
        this.io.sockets.in(this.roomID).emit("fin-de-tour-du-joueur");
        return false;
    }

    getPlateauRoomID(): string {
        return this.roomID;
    }

    getPlateauTableau(): Array<Array<Case>>{
        return this.plateau;
    }

    private mettreMotPlateau(mot: string, pos: Pos, orientation: boolean): void {
        if (orientation === VERTICAL) {
            for (let i = 0; i < mot.length; i++) {
                this.plateau[pos.row + i][pos.col].setLettre(new Lettre(mot[i]));
            }
        }
        else if (orientation === HORIZONTAL) {
            for (let i = 0; i < mot.length; i++) {
                this.plateau[pos.row][pos.col + i].setLettre(new Lettre(mot[i]));
            }
        }
    }

    private posMot(posEtOrientation: string): Pos {
        let posCol = posEtOrientation.slice(1, -1);
        return new Pos(verticalPosMap.get(posEtOrientation[0].toUpperCase()), +posCol - 1);
    }

    private orientationMot(posEtOrientation: string): boolean {
        if (posEtOrientation[posEtOrientation.length - 1] === 'v') {
            return VERTICAL;
        }
        else {
            return HORIZONTAL;
        }
    }

    obtenirLettresRemplacees(mot: string, posEtOrientation: string): Promise<string> {
        return new Promise<string>( (resolve) => {
        mot = mot.toUpperCase();
        let pos = this.posMot(posEtOrientation);
        let orientation = this.orientationMot(posEtOrientation);
        let compteurMot = 4;
        if (orientation === HORIZONTAL && mot.length + pos.col < this.plateau[0].length) {
            for (let i = pos.col; i < pos.col + mot.length; i++) {
                if (this.plateau[pos.row][i].getLettre() !== null) {
                   console.log("LETTRE DU PLATEAU " + this.plateau[pos.row][i].getLettre().getLettre());
                    console.log("Je entre dans slice pour la lettre" + mot[compteurMot]);
                    let temp = "";
                    for (let j = 0; j < mot.length; j++){
                        if (j !== compteurMot){
                            temp += mot[j];
                        }
                    }
                    mot = temp;
                    console.log("Mot apres slice" + mot);
                    compteurMot--;
                }
                compteurMot++;
            }
        }
        else if (orientation === VERTICAL && mot.length + pos.row < this.plateau.length) {
            for (let i = pos.row; i < pos.row + mot.length; i++) {
                if (this.plateau[i][pos.col].getLettre() !== null) {
                    mot.replace(mot[compteurMot], "");
                    console.log("Je entre dans slice pour la lettre" + mot[compteurMot]);
                    let temp = "";
                    for (let j = 0; j < mot.length; j++){
                        if (j !== compteurMot){
                            temp += mot[j];
                        }
                    }
                    mot = temp;
                    console.log("Mot apres slice" + mot);
                    compteurMot--;
                }
                compteurMot++;
            }
        }
        console.log("les lettres a remplacer dans reserve sont: " + mot);
        resolve(mot);
        });
    }
}

verticalPosMap = new TSMap<string, number>([
    ['A', 0],
    ['B', 1],
    ['C', 2],
    ['D', 3],
    ['E', 4],
    ['F', 5],
    ['G', 6],
    ['H', 7],
    ['I', 8],
    ['J', 9],
    ['K', 10],
    ['L', 11],
    ['M', 12],
    ['N', 13],
    ['O', 14]
]);
