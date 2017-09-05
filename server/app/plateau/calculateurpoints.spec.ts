import { expect } from 'chai';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { CalculateurPoints } from './calculateurpoints';
import { Case } from './case';
import { Lettre } from './../listeLettres/lettre';
import { PLATEAU } from './cases-plateau';
import { Pos } from './../pos/pos';
import * as lodash from "lodash";

const VERTICAL = false;
const HORIZONTAL = true;

describe('CalculateurPoints', () => {

  it(`calculerPointsProduitsParMot() calcule bien les points dun mot (pas sur une case bonus)`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");

    // Insert e6h zebre.
    let mot = "ZEBRE";
    let compteurMot = 0;
    for (let i = 5; i < 5 + mot.length; i++) {
      plateau[4][i].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");
    let pos = new Pos(4, 5);
    let nbrPts = calculateur.calculerPointsProduitsParMot("ZEBRE", pos, HORIZONTAL);
    expect(nbrPts).to.be.equal(16);
    // insert e11v salut.
    mot = "SALUT";
    compteurMot = 0;
    for (let i = 5; i < 5 + mot.length; i++) {
      plateau[i][10].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    pos = new Pos(5, 10);
    nbrPts = calculateur.calculerPointsProduitsParMot("SALUT", pos, VERTICAL);
    expect(nbrPts).to.be.equal(5);
  });
  it(`calculerPointsProduitsParNouveauxMots() calcule bien les
         points d'un array de mot (pas sur une case bonus)`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");
    let pos1 = new Pos(7, 6);
    let pos2 = new Pos(7, 6);

    let nouveauxMotsCrees: Array<[string, Pos, boolean]> = [];
    nouveauxMotsCrees.push(["aa", pos1, HORIZONTAL]);
    let compteurMot = 0;
    for (let i = 6; i < 6 + "aa".length; i++) {
      let lettre = new Lettre("aa"[compteurMot]);
      lettre.setValeurPoints(1);
      plateau[7][i].setLettre(lettre);
      compteurMot++;
    }
    nouveauxMotsCrees.push(["avec", pos2, VERTICAL]);
    compteurMot = 0;
    for (let i = 7; i < 7 + "avec".length; i++) {
      let lettre = new Lettre("avec"[compteurMot]);
      lettre.setValeurPoints(1);
      plateau[i][6].setLettre(lettre);
      compteurMot++;
    }

    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");

    let nbrPts = calculateur.calculerPointsProduitsParNouveauxMots(nouveauxMotsCrees);

    expect(nbrPts).to.be.equal(9);
  });
  it(`calculerPointsProduitsParMot() calcule bien les points dun mot avec bonus lettre`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");

    // Insert g6h zebre.
    let mot = "ZEBRE";
    let compteurMot = 0;
    for (let i = 5; i < 5 + mot.length; i++) {
      plateau[6][i].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");
    let pos = new Pos(6, 5);
    let nbrPts = calculateur.calculerPointsProduitsParMot("ZEBRE", pos, HORIZONTAL);
    expect(nbrPts).to.be.equal(18);

    // insert e11v salut.
    mot = "KAYAK";
    compteurMot = 0;
    for (let i = 5; i < 5 + mot.length; i++) {
      plateau[i][5].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    pos = new Pos(5, 5);
    nbrPts = calculateur.calculerPointsProduitsParMot("KAYAK", pos, VERTICAL);
    expect(nbrPts).to.be.equal(72);
  });
  it(`calculerPointsProduitsParNouveauxMots() calcule bien les points d'un array de mot avec bonus lettre`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");
    let pos1 = new Pos(7, 6);
    let pos2 = new Pos(7, 7);

    let nouveauxMotsCrees: Array<[string, Pos, boolean]> = [];
    nouveauxMotsCrees.push(["aa", pos1, HORIZONTAL]);
    let compteurMot = 0;
    for (let i = 6; i < 6 + "aa".length; i++) {
      let lettre = new Lettre("aa"[compteurMot]);
      lettre.setValeurPoints(1);
      plateau[7][i].setLettre(lettre);
      compteurMot++;
    }
    nouveauxMotsCrees.push(["avec", pos2, VERTICAL]);
    compteurMot = 0;
    for (let i = 7; i < 7 + "avec".length; i++) {
      let lettre = new Lettre("avec"[compteurMot]);
      lettre.setValeurPoints(1);
      plateau[i][7].setLettre(lettre);
      compteurMot++;
    }

    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");

    let nbrPts = calculateur.calculerPointsProduitsParNouveauxMots(nouveauxMotsCrees);

    expect(nbrPts).to.be.equal(12);
  });
  it(`calculerPointsProduitsParMot() calcule bien les points dun mot avec bonus mot`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");
    let mot = "ZEBRE";
    let compteurMot = 0;
    for (let i = 4; i < 4 + mot.length; i++) {
      plateau[4][i].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");
    let pos = new Pos(4, 4);
    let nbrPts = calculateur.calculerPointsProduitsParMot("ZEBRE", pos, HORIZONTAL);
    expect(nbrPts).to.be.equal(32);

    mot = "MERDE";
    compteurMot = 0;
    for (let i = 5; i < 5 + mot.length; i++) {
      plateau[i][0].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    pos = new Pos(5, 0);
    nbrPts = calculateur.calculerPointsProduitsParMot("MERDE", pos, VERTICAL);
    expect(nbrPts).to.be.equal(21);
  });
  it(`calculerPointsProduitsParNouveauxMots() calcule bien les points d'un array de mot avec bonus mot`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");
    let pos1 = new Pos(7, 7);
    let pos2 = new Pos(6, 14);

    let nouveauxMotsCrees: Array<[string, Pos, boolean]> = [];
    nouveauxMotsCrees.push(["poussant", pos1, HORIZONTAL]);
    let compteurMot = 0;
    for (let i = 7; i < 7 + "poussant".length; i++) {
      let lettre = new Lettre("poussant"[compteurMot]);
      lettre.setValeurPoints(1);
      plateau[7][i].setLettre(lettre);
      compteurMot++;
    }
    nouveauxMotsCrees.push(["e", pos2, VERTICAL]);
    compteurMot = 0;
      let lettre = new Lettre("e"[compteurMot]);
      lettre.setValeurPoints(1);
      plateau[6][14].setLettre(lettre);

    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");

    let nbrPts = calculateur.calculerPointsProduitsParNouveauxMots(nouveauxMotsCrees);

    expect(nbrPts).to.be.equal(82);
  });

  it(`calculerPointsProduitsParMot() calcule bien les points dun mot avec bonus mot + bonus lettre`, () => {
    let listeUsagers = new ListeUsagers();
    let plateau: Array<Array<Case>>;
    plateau = [[]];
    plateau = lodash.cloneDeep(PLATEAU);
    listeUsagers = new ListeUsagers();
    listeUsagers.addUsager("George", "1");
    listeUsagers.setASonTour("1", true);
    listeUsagers.setUserRoomID("1", "1");

    // insert a1v poulet.
    let mot = "POULET";
    let compteurMot = 0;
    for (let i = 0; i < 0 + mot.length; i++) {
      plateau[i][0].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    let calculateur = new CalculateurPoints(plateau, listeUsagers, "1");
    let pos = new Pos(0, 0);
    let nbrPts = calculateur.calculerPointsProduitsParMot("POULET", pos, VERTICAL);
    expect(nbrPts).to.be.equal(27);

    // Insert g6h zebre.
    mot = "KAYAK";
    compteurMot = 0;
    for (let i = 1; i < 1 + mot.length; i++) {
      plateau[1][i].setLettre(new Lettre(mot[compteurMot]));
      compteurMot++;
    }
    pos = new Pos(1, 1);
    nbrPts = calculateur.calculerPointsProduitsParMot("KAYAK", pos, HORIZONTAL);
    expect(nbrPts).to.be.equal(104);
  });
});


