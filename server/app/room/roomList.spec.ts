import { expect } from 'chai';
import { ListeUsagers } from './../listeUsagers/listeUsagers';
import { RoomList } from './roomList';

describe('Classe RoomList' , () => {

    let roomlist : RoomList;
    let listeUsagers: ListeUsagers = new ListeUsagers();


    it(`On ajoute un utilisateur alors qu'il y'a de la place dans une room alors 
       l'utilisateur est ajouter a cette derniere => jumelage automatique des joueurs`, () => {

          roomlist = new RoomList(3, listeUsagers);
          roomlist.addUser("3");
          expect(roomlist.getListRoom().length).to.be.equal(1);
          expect(roomlist.getListRoom()[0].getNbJoueurs()).to.be.equal(1);

       });
        it(`Si on ajoute un utilisateur et que aucune room est disponible une autre room est cree`, () => {

          roomlist = new RoomList(2, listeUsagers);
          roomlist.addUser("1");
          roomlist.addUser("2");
          roomlist.addUser("3");
          expect(roomlist.getListRoom().length).to.be.equal(2);

           roomlist = new RoomList(3, listeUsagers);
          roomlist.addUser("1");
          roomlist.addUser("2");
          roomlist.addUser("3");
          roomlist.addUser("4");
          roomlist.addUser("5");
          roomlist.addUser("6");
          roomlist.addUser("7");

          expect(roomlist.getListRoom().length).to.be.equal(3);

       });
        it(`addRoom() ajoute une chambre de la taille specifier dans le constructeur`, () => {

          roomlist = new RoomList(3, listeUsagers);
          expect(roomlist.getListRoom().length).to.be.equal(0);
          roomlist.addRoom("30");
          expect(roomlist.getListRoom().length).to.be.equal(1);
          roomlist.addRoom("30");
          expect(roomlist.getListRoom().length).to.be.equal(2);
          roomlist.addRoom("30");
          expect(roomlist.getListRoom().length).to.be.equal(3);
       });

       it(`isGameFull() verifie bien si une room de la liste est remplie`, () => {
          roomlist = new RoomList(2, listeUsagers);
          roomlist.addRoom("20");
          roomlist.addUser("1");

          expect(roomlist.isGameFull("20")).to.be.false;
          roomlist.addUser("2");
          expect(roomlist.isGameFull("20")).to.be.true;
          roomlist.addUser("3");
          expect(roomlist.isGameFull("21")).to.be.false;
          roomlist.addUser("4");
          expect(roomlist.isGameFull("21")).to.be.true;

       });

        it(`isGameFull() verifie bien si une room de la liste est remplie`, () => {
          roomlist = new RoomList(2, listeUsagers);

          roomlist.addRoom("20");
          roomlist.addUser("1");

          expect(roomlist.isGameFull("20")).to.be.false;
          roomlist.addUser("2");
          expect(roomlist.isGameFull("20")).to.be.true;
          roomlist.addUser("3");
          expect(roomlist.isGameFull("21")).to.be.false;
          roomlist.addUser("4");
          expect(roomlist.isGameFull("21")).to.be.true;
       });

        it(`isGameFull() verifie bien si une room de la liste est remplie`, () => {
          roomlist = new RoomList(2, listeUsagers);

          roomlist.addRoom("20");
          roomlist.addUser("1");

          expect(roomlist.isGameFull("20")).to.be.false;
          roomlist.addUser("2");
          expect(roomlist.isGameFull("20")).to.be.true;
          roomlist.addUser("3");
          expect(roomlist.isGameFull("21")).to.be.false;
          roomlist.addUser("4");
          expect(roomlist.isGameFull("21")).to.be.true;
       });

});

