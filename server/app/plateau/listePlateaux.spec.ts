import { expect } from 'chai';
import { ListePlateaux } from './listePlateaux';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

describe('Classe ListePlateaux', () => {
    let test1: ListePlateaux;
    let listeUsagers: ListeUsagers;
    let io : SocketIO.Server;

    it(`test de la methode addPlateau(): ajoute un plateau a la liste`, () => {
        test1 = new ListePlateaux(listeUsagers, io);
        test1.addPlateau("1");
        expect(test1["listePlateaux"].length).to.be.equal(1);
        test1.addPlateau("2");
        expect(test1["listePlateaux"].length).to.be.equal(2);
    });

    it(`test de la methode deletePlateau(): enleve un plateau a la liste`, () => {
        test1 = new ListePlateaux(listeUsagers, io);
        test1.addPlateau("1");
        test1.removePlateau("1");
        expect(test1["listePlateaux"].length).to.be.equal(0);
        test1.addPlateau("1");
        test1.addPlateau("2");
        test1.addPlateau("3");
        test1.removePlateau("1");
        expect(test1["listePlateaux"].length).to.be.equal(2);
    });

    it(`test de la methode plateauPresent(): retourne true si un plateau donne est dans la liste`, () => {
        test1 = new ListePlateaux(listeUsagers, io);
        test1.addPlateau("1");
        expect(test1["plateauPresent"]("1")).to.be.true;
        test1.removePlateau("1");
        expect(test1["plateauPresent"]("1")).to.be.false;
        test1.addPlateau("1");
        expect(test1["plateauPresent"]("1")).to.be.true;
        test1.addPlateau("2");
        expect(test1["plateauPresent"]("2")).to.be.true;
        test1.addPlateau("3");
        expect(test1["plateauPresent"]("3")).to.be.true;
        test1.removePlateau("1");
        expect(test1["plateauPresent"]("1")).to.be.false;
    });
      it(`test de la methode findPlateauIndex(): renvoie l'index d'un plateau existant sinon renvoie -1`, () => {
        test1 = new ListePlateaux(listeUsagers, io);
        test1.addPlateau("1");
        expect(test1["findPlateauIndex"]("1")).to.be.equal(0);
        test1.removePlateau("1");
        expect(test1["findPlateauIndex"]("1")).to.be.equal(-1);
        test1.addPlateau("1");
        expect(test1["findPlateauIndex"]("1")).to.be.equal(0);
        test1.addPlateau("2");
        expect(test1["findPlateauIndex"]("2")).to.be.equal(1);
        test1.addPlateau("3");
        expect(test1["findPlateauIndex"]("3")).to.be.equal(2);
        test1.removePlateau("1");
        expect(test1["findPlateauIndex"]("2")).to.be.equal(0);
        expect(test1["findPlateauIndex"]("3")).to.be.equal(1);
        expect(test1["findPlateauIndex"]("4")).to.be.equal(-1);
    });
});
