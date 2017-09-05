import { expect } from 'chai';
import { Room } from './room';
import { ListeUsagers } from './../listeUsagers/listeUsagers';

describe('Classe Room' , () => {

    let room4Joueurs : Room;
    let room2Joueurs : Room;

    it(`Pour Room de taille 4, si elle n'est pas remplie, la methode isRoomFull() retourne false`, () => {
       let listeUsagers: ListeUsagers = new ListeUsagers();
       room4Joueurs = new Room(4, "40", listeUsagers);

      listeUsagers.addUsager("Saad", "1");
      listeUsagers.addUsager("Charbel", "2");
       expect(room4Joueurs.isRoomFull()).to.be.false;
    });

    it(`Pour Room de taille 2, si elle n'est pas remplie, la methode isRoomFull() retourne false`, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
        room2Joueurs = new Room(2, "20", listeUsagers);
        expect(room2Joueurs.isRoomFull()).to.be.false;
    });

    it(`Pour Room de taille 4, si elle n'est pas remplie, la methode isGameStarted() retourne false`, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
        room4Joueurs = new Room(4, "40", listeUsagers);
        expect(room4Joueurs.isGameStarted()).to.be.false;
    });

    it(`Pour Room de taille 2, si elle n'est pas remplie, la methode isGameStarted() retourne false`, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
        room2Joueurs = new Room(2, "20", listeUsagers);
        expect(room2Joueurs.isGameStarted()).to.be.false;
    });

    it(`Pour Room de taille 4, si elle est remplie, la methode isRoomFull() retourne true`, () => {
       let listeUsagers: ListeUsagers = new ListeUsagers();
       room4Joueurs = new Room(4, "40", listeUsagers);

       listeUsagers.addUsager("Saad", "1");
       listeUsagers.addUsager("Charbel", "2");
       listeUsagers.addUsager("John", "3");
       listeUsagers.addUsager("Manel", "4");

       room4Joueurs.addUser("1");
       room4Joueurs.addUser("2");
       room4Joueurs.addUser("3");
       room4Joueurs.addUser("4");
       expect(room4Joueurs.isRoomFull()).to.be.true;
    });

    it(`Pour Room de taille 2, si elle est remplie, la methode isRoomFull() retourne true`, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
        room2Joueurs = new Room(2, "20", listeUsagers);

        listeUsagers.addUsager("Djawad", "5");
        listeUsagers.addUsager("Yacine", "6");
        room2Joueurs.addUser("5");
        room2Joueurs.addUser("6");
        expect(room2Joueurs.isRoomFull()).to.be.true;
    });

    it(`Pour Room de taille 4, si elle est remplie, la methode isGameStarted() retourne true`, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
        room4Joueurs = new Room(4, "40", listeUsagers);

        listeUsagers.addUsager("Saad", "1");
        listeUsagers.addUsager("Charbel", "2");
        listeUsagers.addUsager("John", "3");
        listeUsagers.addUsager("Manel", "4");

        room4Joueurs.addUser("1");
        room4Joueurs.addUser("2");
        room4Joueurs.addUser("3");
        room4Joueurs.addUser("4");

        expect(room4Joueurs.isGameStarted()).to.be.true;
    });

    it(`Pour Room de taille 2, si elle est remplie, la methode isGameStarted() retourne true`, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
       room2Joueurs = new Room(2, "20", listeUsagers);

        listeUsagers.addUsager("Djawad", "5");
        listeUsagers.addUsager("Yacine", "6");
        room2Joueurs.addUser("5");
        room2Joueurs.addUser("6");
        expect(room2Joueurs.isGameStarted()).to.be.true;
    });

    it(`Pour Room de taille 2 remplie en appellant la methode removeUser() il y'aura 1 joueur dans la room `, () => {
        let listeUsagers: ListeUsagers = new ListeUsagers();
        room2Joueurs = new Room(2, "20", listeUsagers);

        listeUsagers.addUsager("Djawad", "5");
        listeUsagers.addUsager("Yacine", "6");

        room2Joueurs.addUser("5");
        room2Joueurs.addUser("6");

        expect(room2Joueurs.isRoomFull()).to.be.true;

        room2Joueurs.removeUser("5");

        expect(room2Joueurs.getNbJoueurs()).to.be.equal(1);
    });


});

